<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use ColorThief\ColorThief;
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
 * import_hero_image_to_paragraph:
 *   plugin: milken_migrate:hero_to_para
 *   title_source: field_title_source
 *   title_source_backup: title
 *   image: secondary source of title if first one is null
 *   link_id: uuid
 *   link_entity_type_id: node
 *   link_bundle: report
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
 *   id = "milken_migrate:hero_to_para",
 * );
 */
class HeroImageToParagraph extends MilkenProcessPluginBase implements MigrateProcessInterface {

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
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)) {
      return NULL;
    }

    if (!isset($this->configuration['title_source'])
      || !isset($this->configuration['image'])) {
      throw new MigrateException("The :class plugin is not correctly configured. :configuration",
        [
          ":class" => __CLASS__,
          ":configuration" => \Kint::dump($this->configuration, TRUE),
        ]);
    }

    $source = $row->getSource();
    $destination_value = $row->getDestinationProperty($destination_property) ?? [];

    try {
      $destination = [
        'type' => 'full_width_one_column',
        'uid' => 2,
        'langcode' => \Drupal::languageManager()
          ->getDefaultLanguage()
          ->getId(),
        'field_published' => TRUE,
      ];

      // ** Title cannot be empty.
      // Try "title_source", then "title_source_backup".
      // If all else fails, generate a random title.
      $destination['title'] = (
      empty($source[$this->configuration['title_source']])
        ? (
      empty($source[$this->configuration['title_source_backup']]) ?
        $this->getRandom()->sentences(mt_rand(1, 20), TRUE) :
        $source[$this->configuration['title_source_backup']]
      )
        : $source[$this->configuration['title_source']]
      );
      $destination['name'] = $destination['title'];

      // ** Subhead is optional
      $destination['field_subhead'] = (isset($this->configuration['subhead'])
        && isset($source[$this->configuration['subhead']]))
        ? $source[$this->configuration['subhead']] : NULL;

      // ** Background Image is dependent on the download process
      // Should this fail, the catch loops will log the error.
      $background_image_file = $source[$this->configuration['image']];
      $file = $this->getRemoteFile($background_image_file['filename'],
        $source['jsonapi_host'] . $background_image_file['uri']['url']);

      if ($file instanceof FileInterface) {
        $file->setPermanent();
        $file->isNew();
        $file->save();
        $destination['field_background_image'] = $file;
        $destination['field_text_color'] = ['color' => "#000000"];

        $realpath = \Drupal::service('file_system')
          ->realpath($file->getFileUri());
        if (file_exists($realpath)) {
          // $complimentary =
          // @$this->generateComplimentaryColorFromImageHistorgram($realpath)
          // ?? 'transparent';
          $destination['field_text_color'] = ['color' => "#dfdfdf"];
        }
      }
      // ** LINK content object to which this slide is linked.
      if (isset($this->configuration['should_be_link_id_but_im_temporarily_disabling'])) {
        $destination['field_link'] = [
          'url' => "/node/" . $source[$this->configuration['link_id']],
          "title" => "click here",
        ];
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
    \Drupal::logger('milken_migrate')
      ->debug("File has been acquired and saved.");
    // If any part of the import fails, still do the node creation.
    try {

      $slide = $this->entityTypeManager->getStorage('slide')->create($destination);
      $paragraph = $this->entityTypeManager->getStorage('paragraph')->create([
        'type' => 'slide',
      ]);
      if ($slide instanceof EntityInterface && $paragraph instanceof EntityInterface) {
        $slide->set('langcode', 'en');
        $slide->isNew();
        $slide->save();
        $paragraph->set('langcode', 'en');
        $paragraph->set('field_background', 'transparent');
        $paragraph->set('field_slides', [$slide]);
        $paragraph->isNew();
        $paragraph->save();
        array_push($destination_value, $paragraph);
        return $destination_value;
      }
    }
    catch (\Exception $e) {
      $message = __CLASS__ . "::Error saving imported slide: " . $e->getMessage();
      \Drupal::logger('milken_migrate')
        ->error($message);
    }
    catch (\Throwable $t) {
      $message = $t->getMessage() . \Kint::dump($destination, TRUE);
      \Drupal::logger('milken_migrate')
        ->error($message);
    }

    return new MigrateSkipProcessException($message ?? ("Error Occurred!: " . \Kint::dump($destination_value, TRUE)));
  }

  /**
   * Turn remote URL into local FileInterface object.
   */
  public function getRemoteFile($name, $url): ?FileInterface {
    $client = $this->getClient();
    $response = $client->get($url);
    $toReturn = file_save_data($response->getBody(), "public://" . $name, FileSystemInterface::EXISTS_REPLACE);
    if ($toReturn instanceof FileInterface) {
      $realpath = \Drupal::service('file_system')
        ->realpath($toReturn->getFileUri());
      if (isset($_SERVER['USER'])) {
        chown($realpath, $_SERVER['USER']);
        chgrp($realpath, $_SERVER['USER']);
      }
      $toReturn->save();
      return $toReturn;
    }
    return NULL;
  }

  /**
   * From color thief array return a RGB color.
   *
   * @param array $colorArray
   *   Input array from ColorThief.
   *
   * @return string
   *   Return RGB Color.
   */
  public function arrayToRgbColor(array $colorArray): string {
    if (is_array($colorArray) && count($colorArray) == 3) {
      return "rgb(" . implode(", ", $colorArray) . ")";
    }
    return "#FFFFFF";
  }

  /**
   * From color thief array return a RGB color.
   *
   * @param array $colorArray
   *   Input array from ColorThief.
   *
   * @return string
   *   Return Hex Color.
   */
  public function arrayToHex(array $colorArray): string {
    return "#" . dechex($colorArray[0]) . dechex($colorArray[1]) . dechex($colorArray[2]);
  }

  /**
   * Return a hex color if exists in string.
   *
   * @param string $string_results
   *   A longer string from which hex color needs to be derived.
   *
   * @return string
   *   Return string.
   */
  public function matchColorInStringResults(string $string_results): string {
    $matches = [];
    $found = preg_match_all('/#(?:[0-9a-fA-F]{6})/', $string_results, $matches);
    if ($found) {
      return array_shift($matches[0]);
    }
    return "#000000";
  }

  /**
   * Generate a complimentary color for headline text that goes over image.
   *
   * @param string $realpath
   *   Realpath of the image.
   *
   * @return string
   *   A hex color.
   */
  public function generateComplimentaryColorFromImageHistorgram(string $realpath): string {
    try {
      $dominant_color_array = ColorThief::getColor($realpath);
      if (empty($dominant_color_array)) {
        throw new MigrateException("Cannot read image: :realpath", [":realpath" => $realpath]);
      }
      $dominant_color = $this->arrayToRgbColor($dominant_color_array);
      if ($dominant_color !== "#FFFFFF" && $dominant_color !== "#000000") {
        $dominant_color_pixel = new \ImagickPixel($dominant_color);
        if ($dominant_color_pixel instanceof \ImagickPixel) {
          $image = new \Imagick();
          $image->newImage(100, 100, $dominant_color_pixel);
          $image->modulateImage(100, 100, 0);
          \Drupal::logger('milken_migrate')->debug(
            \Kint::dump($dominant_color, TRUE) . "::" . \Kint::dump($dominant_color_array, TRUE)
          );
          $complimentary_color = ColorThief::getColor($image);
          \Drupal::logger('milken_migrate')->debug(
            \Kint::dump($complimentary_color, TRUE)
          );
          return $this->arrayToHex($complimentary_color);
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')->debug("Color Generation Error: " .
        $e->getMessage() . print_r($dominant_color, TRUE) . "::" . print_r($dominant_color_array, TRUE)
          );
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')->debug("Color Generation Error: " .
        $t->getMessage() . print_r($dominant_color, TRUE) . "::" . print_r($dominant_color_array, TRUE)
          );
    }
    return "#dfdfdf";
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
