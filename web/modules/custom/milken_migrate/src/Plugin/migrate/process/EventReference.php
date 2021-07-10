<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;

/**
 * Search for Event ID and return reference to internal event entity.
 *
 * @Class BodyEmbed
 * @code
 * field_grid_event_id:
 *   plugin: milken_migrate:event_reference
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:event_reference"
 * );
 */
class EventReference extends MilkenProcessPluginBase {

  /**
   * Main guts of the plugin.
   *
   * @param mixed $value
   *   Incoming value from source row.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Migration executable.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   * @param string $destination_property
   *   Destination Property.
   *
   * @return array
   *   Retruned Data.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);

    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)) {
      return NULL;
    }
    if (is_array($value)) {
      $properties['field_grid_event_id'] = $value['field_grid_event_id'];
    }
    if (is_string($value)) {
      $properties['field_grid_event_id'] = $value;
    }
    if (!empty($properties)) {
      $exists = $this->entityTypeManager
        ->getStorage('event')
        ->loadByProperties($properties);
      if (!empty($exists)) {
        return reset($exists);
      }
    }
    return FALSE;
  }

}
