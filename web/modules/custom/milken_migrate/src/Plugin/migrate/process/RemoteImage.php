<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use PHPUnit\Util\Exception;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_image
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_image",
 *   handle_multiples = TRUE,
 * );
 */
class RemoteImage extends MilkenProcessPluginBase implements MigrateProcessInterface {

  use JsonAPIDataFetcherTrait;
  use EntityExistsTrait;

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
    $destination_values = [];
    $source = $row->getSourceProperty($this->configuration['source']);
    $file = NULL;
    if ($value) {
      \Drupal::logger('milken_migrate')->debug('~~~~!!!Remote Image has value' . \Kint::dump($value, TRUE));
    }
    if (!isset($this->configuration['source'])) {
      throw new Exception('RemoteImage plugin has no source property:' . \Kint::dump($this->configuration, TRUE));
    }

    \Drupal::logger('milken_migrate')
      ->debug("Source: " . \Kint::dump($source));

    if (isset($source['id'])) {
      $source = [$source];
    }
    foreach ($source as $reference) {
      \Drupal::logger('milken_migrate')
        ->debug("Ref: " . \Kint::dump($reference));
      if (array_key_exists('data', $reference)) {
        continue;
      }
      $ref = new JsonAPIReference($reference, $this->entityTypeManager);
      if (!$ref instanceof JsonAPIReference || $ref->valid() === FALSE) {
        return $ref;
      }
      $ref->getRemoteData();
      $exists = $this->entityExixsts($ref->getEntityTypeId(), $ref->getId());
      if ($exists instanceof EntityInterface) {
        array_push($destination_values, $exists->id());
      }
      else {
        try {
          if ($ref->getUrl() === NULL) {
            \Drupal::logger('milken_migrate')
              ->debug("SKIP importing hero image. JSON data is empty: ");
            throw new MigrateSkipRowException("JSON data is empty.");
          }
          $url = $source['jsonapi_host'] . $ref->getUrl();
          \Drupal::logger('milken_migrate')->debug($url);
          $file = $this->getRemoteFile($ref->getFilename(), $url);
          if ($file instanceof FileInterface) {
            $file->setPermanent();
            $file->isNew();
            $file->save();
            $image_title = (isset($this->configuration['title'])
              ? $this->configuration['title'] : $file->getFilename());
            $media_type = (isset($this->configuration['media_type'])
              ? $this->configuration['media_type'] : "image");

            $image = $this->entityTypeManager->getStorage('media')->create([
              'type' => $media_type,
              'uid' => 2,
              'langcode' => \Drupal::languageManager()
                ->getDefaultLanguage()
                ->getId(),
              'field_media_image' => [
                'target_id' => $file->id(),
                'target_type' => 'file',
                'alt' => $file->getFilename(),
                'title' => $file->getFilename(),
              ],
              'title' => $image_title,
              // 'field_link' => Url::fromUri('/node/'
              // . $row->getSourceProperty('uuid')),
              // @todo figure out how to link it back to the node
              'field_published' => TRUE,
            ]);
            if ($image instanceof EntityInterface) {
              $image->save();
              array_push($destination_values, $image);
            }
          }
        }
        catch (\Exception $e) {
          \Drupal::logger('milken_migrate')
            ->error(__CLASS__ . "::IMPORT ERROR: " . $e->getMessage());
          throw new MigrateException($e->getMessage());
        }
        catch (\Throwable $t) {
          \Drupal::logger('milken_migrate')
            ->error(__CLASS__ . "::IMPORT ERROR: " . $t->getMessage());
          throw new MigrateException($t->getMessage());
        }
      }
    }
    return $destination_values;
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

}
