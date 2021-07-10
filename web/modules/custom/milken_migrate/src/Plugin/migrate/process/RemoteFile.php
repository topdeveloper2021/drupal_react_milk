<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\file\FileInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\BundleTypeDataFetcher;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * field_image:
 *   plugin: milken_migrate:remote_file
 *   source: {property name where file appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_file",
 *   handle_multiples = true,
 * );
 */
class RemoteFile extends MilkenProcessPluginBase implements MigrateProcessInterface {

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
    $sources = $row->getSourceProperty($this->configuration['source']);
    if (isset($sources['data']) && empty($sources['data'])) {
      throw new MigrateSkipRowException("Skip importing remote file: no data");
    }
    if (empty($sources) || !is_array($sources)) {
      return NULL;
    }
    if (isset($sources['id'])) {
      $sources = [$sources];
    }
    foreach ($sources as $source) {
      if ($source == NULL || array_key_exists('data', $source) || array_key_exists('related', $source)) {
        continue;
      }
      $ref = new JsonAPIReference($source, $this->entityTypeManager);

      if ($ref->getEntityTypeId() == "media") {
        $ref->getRemoteData();
        $bundle = $ref->getBundle($this->entityTypeManager);
        if ($bundle instanceof BundleTypeDataFetcher) {

          $mediaSource = $bundle->getProperty('source_configuration')['source_field'] ?? NULL;
          $mediaSourceProperty = $ref->getProperty($mediaSource);
          if ($mediaSourceProperty) {
            $ref = new JsonAPIReference($mediaSourceProperty, $this->entityTypeManager);
          }
          else {
            throw new MigrateException("Cannot get source property for media field:" . \Kint::dump($bundle));
          }
        }
        else {
          $ref = NULL;
        }
      }

      if (!$ref instanceof JsonAPIReference) {
        return [];
      }
      $ref->getRemoteData();

      if ($ref->valid() === FALSE || $ref->getFilename() === NULL || $ref->getUrl() === NULL) {
        return NULL;
      }
      if (substr($ref->getFilename(), 0, 6) === "sample") {
        return NULL;
      }

      try {
        $file = $ref->exists();
        if ($file instanceof EntityInterface) {
          $destination_values[] = $file;
          continue;
        }
        $file = $ref->getRemote();
        if ($file instanceof FileInterface) {
          $file->set('uuid', $ref->getId());
          // @todo Set File Meta Information.
          // $file->set('meta', $ref->getProperty('meta'));.
          $file->setPermanent();
          $file->isNew();
          $file->save();
          $destination_values[] = $file;
        }
      }
      catch (\Exception $e) {
        \Drupal::logger('milken_migrate')
          ->error("IMPORT Exception: " . $e->getMessage());
        throw new MigrateException($e->getMessage());
      }
      catch (\Throwable $t) {
        \Drupal::logger('milken_migrate')
          ->error("IMPORT Throwable: " . $t->getMessage());
        throw new MigrateException($t->getMessage());
      }
    }

    return $destination_values;
  }

}
