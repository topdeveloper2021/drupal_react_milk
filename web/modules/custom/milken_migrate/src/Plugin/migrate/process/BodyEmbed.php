<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Row;

/**
 * Filter to download image and return media reference.
 *
 * @Class BodyEmbed
 * @code
 * field_image:
 *   plugin: milken_migrate:body_embed
 *   source: {name where row data appears}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:body_embed"
 * );
 */
class BodyEmbed extends MilkenProcessPluginBase {

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
   * @return array|string|void
   *   Retruned Data.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) || empty($value)) {
      return NULL;
    }
    $toReturn = "";
    if (is_array($value)) {
      foreach ($value as $field) {
        if (is_string($field)) {
          $toReturn .= $field;
        }
      }
    }
    if (is_string(($value))) {
      $toReturn = $value;
    }
    $paragraph = $this->createBodyTextParagraph($toReturn);

    // Append to the paragraphs field of the node as expressed in the
    // "destination" config.
    if (isset($this->configuration['append_to'])) {
      $destination_value = $row->getDestinationProperty($this->configuration['append_to']) ?? [];
      if ($destination_value) {
        array_push($destination_value, $paragraph);
      }
      else {
        $destination_value = $paragraph;
      }
    }

    return $destination_value;
  }

  /**
   * Create body text paragraph entity from text blob.
   *
   * @param string $text
   *   Incoming text blob.
   *
   * @return \Drupal\migrate\MigrateSkipProcessException|\Drupal\Core\Entity\RevisionableInterface
   *   Saved Paragraph or process exception.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function createBodyTextParagraph($text) {
    try {
      $paragraph = $this->entityTypeManager->getStorage('paragraph')->create(['type' => 'body_content']);
      if ($paragraph instanceof RevisionableInterface) {
        $paragraph->set('field_body', [
          'value' => $text,
          'format' => 'full_html',
        ]);
        $paragraph->set('field_num_text_columns', 1);
        $paragraph->set('field_background', 'transparent');
        $paragraph->set('langcode', 'en');
        $paragraph->isNew();
        $paragraph->save();
        return $paragraph;
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Exception: " . $e->getMessage());
      return new MigrateSkipProcessException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error("IMPORT Throwable: " . $t->getMessage());
      return new MigrateSkipProcessException($t->getMessage());
    }
    return new MigrateSkipProcessException("Cannot create paragraph for text.");
  }

}
