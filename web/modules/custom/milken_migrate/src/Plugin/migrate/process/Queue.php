<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\eck\EckEntityInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * Filter to download image and return media reference.
 *
 * @code
 * field_promo_slide:
 *   plugin: milken_create_queue_from_array
 *   source: field_source_value
 * @endcode
 *
 * Source:
 * The source property from which the title of the slide should
 * be derived.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:queue",
 * );
 */
class Queue extends ProcessPluginBase implements MigrateProcessInterface {

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
    if ($row->isStub()) {
      return NULL;
    }

    if (
      !isset($this->configuration['source']) ||
      !isset($this->configuration['title_source']) ||
      !isset($this->configuration['queue_machine_name_source'])
    ) {
      return new MigrateException("The :class plugin is not correctly configured. :configuration",
        [
          ":class" => __CLASS__,
          ":configuration" => \Kint::dump($this->configuration, TRUE),
        ]);
    }
    $subqueue = \Drupal::entityTypeManager()
      ->getStorage('entity_subqueue')
      ->load('new_subqueue');
    if (!$subqueue instanceof EntityInterface) {
      throw new MigrateException('=>  new_subqueue has not been created in Queues=>Featured.');
    }

    try {
      $missing_migrations = [];
      $queue_items = [];
      $queue_title = $row->getSourceProperty($this->configuration['title_source']) . uniqid();
      $newSubqueue = $subqueue->createDuplicate();
      $newSubqueue->set('name', $queue_title);
      $newSubqueue->set('title', $queue_title);

      foreach ($value as $item) {
        if ($item['type'] == "unknown" || $item['id'] == "missing") {
          return new MigrateSkipRowException('Item UUID is missing');
        }
        $queue_item = $this->getEntityForSubqueue($item);
        if ($queue_item instanceof EckEntityInterface) {
          $missing_migrations[] = ['target_id' => $queue_item->id()];
        }
        else {
          $queue_items[] = ['target_id' => $queue_item->id()];
        }
      }

      $newSubqueue->set('items', $queue_items);
      $newSubqueue->set('field_missing_migrations', $missing_migrations);
      $newSubqueue->save();
      return $newSubqueue;
    }
    catch (\Exception $e) {
      print \Kint::dump($e->getTrace());
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::Exception: " . $e->getMessage());
      throw new MigrateException($e->getMessage() . \Kint::dump($row->getDestination(), TRUE));
    }
    catch (\Throwable $t) {
      print \Kint::dump($t->getTrace());
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::Throwable: " . $t->getMessage());
      throw new MigrateException($t->getMessage() . \Kint::dump($row->getDestination(), TRUE));
    }
    return NULL;
  }

  /**
   * Get the Entity or return missing migration entity.
   *
   * @param array $jsonapi
   *   Data from jsonapi response.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   *   The entity.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException|\Drupal\Core\Entity\EntityStorageException
   */
  protected function getEntityForSubqueue(array $jsonapi): EntityInterface {
    [$entityTypeId] = explode('--', $jsonapi['type']);
    $results = \Drupal::entityTypeManager()
      ->getStorage($entityTypeId)
      ->loadByProperties(['uuid' => $jsonapi['id']]);
    if (count($results)) {
      return \Drupal::entityTypeManager()
        ->getStorage($entityTypeId)
        ->load(array_shift($results));
    }
    return $this->createMissingMigration($jsonapi['type'], $jsonapi['id']);
  }

  /**
   * Create a missing migration Entity.
   *
   * @param string $type
   *   Missing migration entity type from jsonapi.
   * @param string $id
   *   Missing Migration entity uuid.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   *   Entity Interface.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function createMissingMigration(string $type, string $id): EntityInterface {
    $mm_storage = \Drupal::entityTypeManager()->getStorage('missing_migration');
    $exists = $mm_storage->getQuery('and')
      ->condition('field_id', $id)
      ->execute();
    if (count($exists)) {
      return $mm_storage->load(reset($exists));
    }
    else {
      $toReturn = $mm_storage->create([
        'type' => 'missing_migration',
        'uuid' => $id,
        'name' => $type,
        'title' => $type,
        'field_type' => $type,
        'field_id' => $id,
      ]);
      $toReturn->save();
      return $toReturn;
    }
  }

}
