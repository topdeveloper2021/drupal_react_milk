<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use PHPUnit\Util\Exception;

/**
 * Filter to download media file and return media reference.
 *
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_media
 *   source: field
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_media",
 *   handle_multiples = TRUE,
 * );
 */
class RemoteMedia extends ProcessPluginBase implements MigrateProcessInterface {

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
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)
    ) {
      return NULL;
    }
    $destination_values = [];
    $file = NULL;
    if (!isset($this->configuration['source']) || !isset($this->configuration['default_bundle'])) {
      throw new Exception('RemoteImage plugin has no source property:' . \Kint::dump($this->configuration, TRUE));
    }

    if ($row->isStub()) {
      return NULL;
    }
    $source = $row->getSourceProperty($this->configuration['source']);
    if (isset($source['id'])) {
      $source = [$source];
    }
    foreach ($source as $reference) {
      $ref = new JsonAPIReference($reference);
      if (!$ref instanceof JsonAPIReference || $ref->valid() === FALSE) {
        continue;
      }
      $ref->getRemoteData();
      $exists = $ref->exists();
      if ($exists instanceof EntityInterface) {
        array_push($destination_values, $exists);
        continue;
      }
      else {
        try {
          $sourceField = $ref->getProperty($ref->getBundleSourceField());
          $sourceFieldRef = (is_array($sourceField) ? new JsonAPIReference($sourceField) : NULL);
          if ($sourceFieldRef instanceof JsonAPIReference) {
            $sourceFieldRef->getRemoteData();
            $file = $sourceFieldRef->getRemote();
          }
          if ($file instanceof FileInterface) {
            $file->setPermanent();
            $file->isNew();
            $file->save();
            $media_title = $row->getSourceProperty($this->configuration['title']) ?? $file->getFilename();
            $audio = \Drupal::getContainer()
              ->get('entity_type.manager')
              ->getStorage('media')
              ->create([
                'type' => $this->configuration['default_bundle'],
                'uuid' => $ref->getId(),
                'uid' => 2,
                'langcode' => \Drupal::languageManager()
                  ->getDefaultLanguage()
                  ->getId(),
                $sourceField => [
                  'target_id' => $file->id(),
                ],
                'title' => $media_title,
                'name' => $media_title,
                // 'field_link' => Url::fromUri('/node/'
                // . $row->getSourceProperty('uuid')),
                // @todo figure out how to link it back to the node
                'status' => TRUE,
                'field_published' => TRUE,
              ]);
            if ($audio instanceof EntityInterface) {
              $audio->save();
              array_push($destination_values, $audio);
            }
            continue;
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
