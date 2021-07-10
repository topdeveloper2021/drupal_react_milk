<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Component\Serialization\Json;
use Drupal\migrate\MigrateException;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Plugin\MigrateProcessInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Embera\Embera;

/**
 * Filter to download video URL's improperly stored to fully-fledged entities.
 *
 *
 * @code
 * oembed_video_vidle:
 *   plugin: milken_migrate:remove_video
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:remote_video"
 * );
 */
class RemoteVideo extends ProcessPluginBase implements MigrateProcessInterface {

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
    $embera = new Embera();
    try {
      // $source = $row->getSource();
      if (!empty($value)) {
        $info = $embera->getUrlData([$value]);
        if (is_array($info) && count($info)) {
          $info = array_shift($info);
          if (!isset($info['video_id'])) {
            preg_match('~(?:v=|youtu\.be/|youtube\.com/embed/)([a-z0-9_\-]+)~i', (string) $value, $matches);
            $info['video_id'] = isset($matches[1]) ? $matches[1] : $value;
          }
          $row->setDestinationProperty('field_embedded_service', $info['provider_name']);
          $row->setDestinationProperty('field_embedded_id', $info['video_id']);
          $row->setDestinationProperty('field_embedded_oembed', Json::encode($info));
        }

        return $value;
      }
      return NULL;

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
    return $value;
  }

}
