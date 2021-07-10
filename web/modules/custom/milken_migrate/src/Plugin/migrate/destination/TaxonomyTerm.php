<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\eck\EckEntityInterface;
use Drupal\migrate\Row;

/**
 * Speaker destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:taxonomy_term",
 * )
 */
class TaxonomyTerm extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    $toReturn = NULL;
    $termData = [];
    $terms = $this->storage->loadTree($this->getBundle($row));
    foreach ($terms as $term) {
      $termData[$term->name] = $term->tid;
    }
    if (isset($termData[$row->get('name')])) {
      $term = $this->storage->load($termData[$row->get('name')]);
    }
    else {
      $term = $this->storage->create([
        'vid' => 'tracks',
        'name' => $row->get('name'),
      ]);
      $toReturn = $this->save($term, $old_destination_id_values);
    }
    if ($term instanceof EntityInterface && !empty($row->get('eventid'))) {
      $this->addTrackToEvent($row->get('eventid'), $term->id());
    }
    return $toReturn;
  }

  /**
   * {@inheritDoc}
   */
  public function getBundle(Row $row = NULL) {
    return "tracks";
  }

  /**
   * Add "Track" taxonomy.
   *
   * @param string $eventID
   *   Foreign key linking to events.
   * @param string|int $tid
   *   Foreigh Key for Taxonomy Term.
   *
   * @return \Drupal\eck\EckEntityInterface|mixed
   *   Returns the ECK Entity.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   *    If storage fails, will throw this exception.
   */
  public function addTrackToEvent($eventID, $tid) {
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage('event');
    $event = $entityStorage
      ->getQuery()
      ->condition('field_grid_event_id', $eventID);

    if ($event instanceof EckEntityInterface) {
      $event->get('field_tracks')
        ->appendItem(['tid' => $tid]);
      $event->save();
    }
    return $event;
  }

  /**
   * No related fields for this entity.
   *
   * @param \Drupal\migrate\Row $row
   *   Row Object.
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   Entity object.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   *   Updated entity object.
   */
  public function setRelatedFields(Row $row, EntityInterface $entity) : EntityInterface {
    return $entity;
  }

  /**
   * {@inheritDoc}
   */
  public static function getEntityTypeId($plugin_id) {
    return 'taxonomy_term';
  }

}
