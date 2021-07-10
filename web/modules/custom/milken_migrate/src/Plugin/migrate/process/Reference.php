<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * This plugin gets a reference to another entity with a specific property.
 *
 * @code
 *
 *   field_event:
 *     plugin: milken_reference
 *     source: eventID
 *     referenced_entity: event
 *     referenced_entity_search_property: field_grid_event_id
 *
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:reference",
 * )
 */
class Reference extends MilkenProcessPluginBase {

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    return $this->entityTypeManager
      ->getStorage($this->configuration['referenced_entity'])
      ->loadByProperties([
        $this->configuration['referenced_entity_search_property'],
        $row->getSource()[$this->configuration['source']],
      ]);

  }

}
