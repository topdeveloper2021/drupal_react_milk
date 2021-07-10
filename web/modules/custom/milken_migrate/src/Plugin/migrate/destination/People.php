<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\Row;

/**
 * Speaker destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:people",
 * )
 */
class People extends MilkenMigrateDestinationBase {

  /**
   * {@inheritDoc}
   */
  public function getBundle(Row $row = NULL) {
    return $this->configuration['default_bundle'] ?? "staff";
  }

  /**
   * {@inheritDoc}
   */
  public function setRelatedFields(Row $row, EntityInterface $entity) : EntityInterface {
    $empty = $row->getEmptyDestinationProperties();
    if (in_array("field_first_name", $empty) || in_array("field_last_name", $empty)) {
      $title = explode(" ", $row->getSourceProperty('name'));
      if (is_array($title) && count($title) >= 2) {
        $entity->set('field_first_name', reset($title));
        $entity->set('field_last_name', end($title));
      }
    }
    $entity->set('title', $row->getSourceProperty('name'));
    $this->logger->debug("Saving:" . print_r($entity->toArray(), TRUE));
    $event = $row->getSourceProperty('event');
    if (!$row->isStub() && !empty($event)  && (!isset($event['data']) && !empty($event['data']))) {
      $entity->set('field_event', $this->getEvent($row));
    }
    return $entity;
  }

  /**
   * Add reference link to Event entity.
   *
   * @param \Drupal\migrate\Row $row
   *   Standard Migration Row Object.
   *
   * @return array|null
   *   Returns array of dependent entities or null.
   */
  public function getEvent(Row $row) {
    $entityStorage = $this->container->get('entity_type.manager')->getStorage('event');
    $results = $entityStorage->loadByProperties(['field_grid_event_id' => $row->getSource()['eventid']]);
    $this->logger->debug('Found the following values:' . \Kint::dump($results, TRUE));
    if (is_array($results) && count($results) >= 1 && $resultID = array_shift($results)) {
      $this->logger->debug('Adding value to result set:' . \Kint::dump($resultID, TRUE));
      $entity = $entityStorage->load($resultID);
      if ($entity instanceof EntityInterface) {
        $toReturn = ['target_id' => $resultID];
        $row->setDestinationProperty('field_event', $toReturn);
        return $toReturn;
      }
    }
    return [];
  }

}
