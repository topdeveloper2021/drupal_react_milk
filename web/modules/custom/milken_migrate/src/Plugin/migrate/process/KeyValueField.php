<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;

/**
 * This plugin transforms multiple text fields into a key-value field.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:key_value_field",
 *   handle_multiples=true,
 * )
 */
class KeyValueField extends ProcessPluginBase {

  /**
   * {@inheritDoc}
   *
   * @param mixed $value
   *   Value.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   The migration.
   * @param \Drupal\migrate\Row $row
   *   Row data.
   * @param string $destination_property
   *   Destination Property name.
   *
   * @return array|string
   *   The return value.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)) {
      return NULL;
    }
    $toReturn = [];
    $firstRow = $row->getSourceProperty('field_ch_supporting_text_above');
    if ($firstRow) {
      $toReturn[] = [
        "key" => "h2",
        "value" => $firstRow,
        'format' => 'full_html',
      ];
    }
    $secondRow = $row->getSourceProperty('name');
    if ($secondRow) {
      $toReturn[] = [
        "key" => "h1",
        "value" => $secondRow,
        'format' => 'full_html',
      ];
    }
    $thirdRow = $row->getSourceProperty('field_ch_supporting_text_below');
    if ($thirdRow) {
      $toReturn[] = [
        "key" => "h3",
        "value" => $thirdRow,
        'format' => 'full_html',
      ];
    }
    $fourthRow = $row->getSourceProperty('field_supertitle_cta');
    if ($fourthRow) {
      $toReturn[] = [
        "key" => "h4",
        "value" => $fourthRow,
        'format' => 'full_html',
      ];
    }
    if (empty($toReturn)) {
      foreach ($value as $ordinal => $text) {
        if (trim($text) !== "") {
          $toReturn[] = [
            "key" => "h" . $ordinal,
            "value" => $text,
            'format' => 'full_html',
          ];
        }
      }
    }
    $row->setDestinationProperty($destination_property, $toReturn);
    return $toReturn;
  }

}
