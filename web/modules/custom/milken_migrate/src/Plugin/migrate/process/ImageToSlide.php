<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Component\Utility\Random;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * import_hero_image_to_slide:
 *   plugin: milken_migrate:hero_to_slide
 *   plugin: 'milken_migrate:hero_to_slide'
 *     slide_text:
 *       - hero_title
 *       - short_description
 *     slide_image: hero_image
 *     slide_name: name
 * @endcode
 *
 * Title Source:
 * The source property from which the title of the slide should
 * be derived.
 *
 * Title source backup:
 * The title is not optional. If a secondary source is not provided
 * and the primary source is empty, a randomized title will be generated.
 *
 * Image:
 * The source which will reference the slide's background image property. It
 * should be a standard file field. Json API will download the file for you.
 * The importer will use image magick to try to determine a color to record
 * for the text.
 *
 * Link:
 * The link is essentially a link to another drupal entity. Give it
 * EntityTypeId, Bundle and UUID and it will retrieve the data to create
 * the link.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:hero_to_slide",
 *   handle_multiples = TRUE,
 * );
 */
class ImageToSlide extends MilkenProcessPluginBase implements MigrateProcessInterface {

  use JsonAPIDataFetcherTrait;

  /**
   * Random number generator.
   *
   * @var \Drupal\Component\Utility\Random
   */
  protected $random;

  /**
   * Transform remote image ref into local Media Object.
   *
   * @param mixed $value
   *   Value to import.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Executable migration interface.
   * @param \Drupal\migrate\Row $row
   *   Row object with imported/tranformed data.
   * @param string $destination_property
   *   The property to which this value is destined.
   *
   * @return array|int|mixed|string|null
   *   The Value that the trasformation returns.
   *
   * @throws \Drupal\migrate\MigrateException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    $destination_value = [];
    // If there's a data property make the value the data property.
    if (array_key_exists('data', $value)) {
      $value = $value['data'];
    }
    $slide_text = [];
    // Get slide text from configured fields.
    if (isset($this->configuration['slide_text'])) {
      $slide_text = $this->getSlideText($this->configuration['slide_text'], $row);
      // $slide_text = $this->configuration['slide_text'];
      \Drupal::logger('milken_migrate')->debug("~$~ SlideText") . \Kint::dump($slide_text);
      \Drupal::logger('milken_migrate')->debug("~$~ Source") . \Kint::dump($this->configuration['source']);
      \Drupal::logger('milken_migrate')->debug("~$~ SourceGetProperty") . \Kint::dump($row->getSourceProperty($this->configuration['source']));
    }
    // If there's no content to make a slide, move along.
    if ($row->isStub() || (empty($value) && count($slide_text) === 0)) {
      return $destination_value;
    }

    try {
      $destination = [
        'type' => 'full_width_one_column',
        'uid' => 2,
        'langcode' => \Drupal::languageManager()
          ->getDefaultLanguage()
          ->getId(),
        'field_published' => TRUE,
      ];

      if (isset($value['id'])) {
        $exists = $this->entityTypeManager->getStorage('file')
          ->loadByProperties(['uuid' => $value['id']]);
      }
      if (!$exists) {
        $exists = $this->entityTypeManager->getStorage('file')
          ->loadByProperties(['uuid' => 'ffffffff-ffff-ffff-ffff-000000000001']);
      }

      // ** Background Image is dependent on the download process
      // Should this fail, the catch loops will log the error.
      if ($exists) {
        $file = array_shift($exists);
        if ($file instanceof FileInterface) {
          \Drupal::logger('milken_migrate')
            ->debug("~~~ File exists: Attaching" . \Kint::dump($file->toArray()));
        }
        else {
          throw new MigrateException("Gurl, you 'bout to work my LAST nerve." . \Kint::dump($file->toArray(), TRUE));
        }
      }
      else {
        $file = $this->getRemoteFile($value,
          $source['jsonapi_host'] . $row->getSourceProperty($this->configuration['source']));
        $file->isNew();
        $file->setPermanent();
        $file->save();
      }

      if ($file instanceof FileInterface) {
        $destination['field_background_image'] = ['target_id' => $file->id()];
      }
      $destination['field_text_color'] = ['color' => "#FFFFFF"];
      if (count($slide_text)) {
        $destination['field_slide_text'] = $slide_text;
      }

      \Drupal::logger('milken_migrate')
        ->debug("DESTINATION SO FAR: " . print_r($destination, TRUE));
      $slide = $this->entityTypeManager->getStorage('slide')
        ->create($destination);

      if ($slide instanceof EntityInterface) {
        $slide->set('langcode', 'en');
        $slide->isNew();
        $slide->save();
        // RETURN the slide as the reference.
        \Drupal::logger('milken_migrate')
          ->debug(__CLASS__ . "::" . print_r($slide->toArray(), TRUE));
        return [$slide];
      }
      else {
        throw new MigrateException("unable to create Slide for value: ", \Kint::dump($destination, TRUE));
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $e->getMessage());
      return new MigrateSkipProcessException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $t->getMessage());
      return new MigrateSkipProcessException($t->getMessage());
    }
    return new MigrateSkipProcessException($message ?? ("Error Occurred!: " . \Kint::dump($destination_value, TRUE)));
  }

  /**
   * Extract the Slide text from the $row object.
   *
   * @param array $slideTextProperties
   *   Properties from which to extract data from the row.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   *
   * @return array
   *   Return an array that can be saved as a Key=>Value text field.
   */
  public function getSlideText(array $slideTextProperties, Row $row) {
    $toReturn = [];
    $headline = 1;
    foreach ($slideTextProperties as $property) {
      $text = trim($row->getSourceProperty($property['value']));
      if (!empty($text)) {
        $toReturn[] = [
          'key' => $property['key'],
          'value' => $row->getSourceProperty($property['value']),
        ];
        $headline++;
      }
    }
    return $toReturn;
  }

  /**
   * Turn remote URL into local FileInterface object.
   */
  public function getRemoteFile($name, $url): ?FileInterface {
    \Drupal::logger('milken_migrate')->debug("~~~ getting remote file:" . $url);
    $response = $this->getClient()->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FileSystemInterface::EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')
        ->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      \Drupal::logger('milken_migrate')->debug("~~~ Local Path" . $realpath);
      $toReturn->save();
      return $toReturn;
    }
    return NULL;
  }

  /**
   * Returns the random data generator.
   *
   * @return \Drupal\Component\Utility\Random
   *   The random data generator.
   */
  protected function getRandom() {
    if (!$this->random) {
      $this->random = new Random();
    }
    return $this->random;
  }

}
