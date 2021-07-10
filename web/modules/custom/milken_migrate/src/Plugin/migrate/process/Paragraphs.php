<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\RevisionableInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\Row;
use Drupal\milken_migrate\JsonAPIReference;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\entity_embed\Exception\EntityNotFoundException;

/**
 * Filter to download image and return media reference.
 *
 * @class Paragraphs
 * @code
 * field_content:
 *   plugin: milken_migrate:paragraphs
 *   source: {source property from $row}
 * @endcode
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:paragraphs",
 *   handle_multiples = TRUE,
 * );
 */
class Paragraphs extends MilkenProcessPluginBase {

  use JsonAPIDataFetcherTrait;
  use EntityExistsTrait;

  /**
   * {@inheritDoc}
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if ($row->isStub() || (isset($value['data']) && empty($value['data'])) ||
      empty($value)
    ) {
      return NULL;
    }
    if (is_array($value[0][0])) {
      $value = array_shift($value);
    }
    if (isset($value['id'])) {
      $value = [$value];
    }
    $toReturn = $row->getDestinationProperty($destination_property) ?? [];
    foreach ($value as $paragraph_ref) {
      $ref = new JsonAPIReference($paragraph_ref, $this->entityTypeManager);
      if (!$ref instanceof JsonAPIReference) {
        continue;
      }
      $ref->getRemoteData();
      $paragraph = $ref->exists();
      if ($paragraph instanceof RevisionableInterface) {
        $toReturn[] = $paragraph;
        continue;
      }
      else {
        switch ($ref->getBundleTypeId()) {

          case "podcast_episode":
            $episode = $this->entityTypeManager
              ->getStorage('media')
              ->loadByProperties(['field_episode' => $ref->getProperty('field_episode')]);
            if (count($episode)) {
              $paragraph = Paragraph::create([
                'type' => 'podcast_episode',
                'uuid' => $ref->getId(),
                'field_episode_ref' => $episode,
                'langcode' => 'en',
              ]);
              $paragraph->isNew();
            }
            break;

          case "body_content_alternative":
            $paragraph = $this->entityTypeManager->getStorage('paragraph')->create([
              'type' => 'body_content',
              'uuid' => $ref->getId(),
              'field_background' => "transparent",
              'langcode' => 'en',
              'field_body' => [
                'value' => $ref->field_content_alternative_area['value'],
                'format' => 'full_html',
              ],
              'field_num_text_columns' => 1,
            ]);
            $paragraph->isNew();
            break;

          case "pull_quote":
            $paragraph = $this->entityTypeManager->getStorage('paragraph')->create([
              'type' => 'body_content',
              'uuid' => $ref->getId(),
              'field_background' => "transparent",
              'langcode' => 'en',
              'field_body' => [
                'value' => '<blockquote>' . $ref->field_body_quote . '</blockquote>',
                'format' => 'full_html',
              ],
            ]);
            $paragraph->isNew();
            break;

          default:
            \Drupal::logger('milken_migrate')
              ->alert("Cannot migrate paragraph: " . \Kint::dump($ref, TRUE));
        }
      }
      if ($paragraph instanceof Paragraph) {
        try {
          $paragraph->save();
        }
        catch (EntityNotFoundException $e) {
          \Kint::dump($e);
          exit();
        }
        $toReturn[] = $paragraph;
      }
      else {
        throw new MigrateSkipProcessException("cannot create paragraph: " . \Kint::dump($ref, TRUE));
      }
    }
    return $toReturn;
  }

}
