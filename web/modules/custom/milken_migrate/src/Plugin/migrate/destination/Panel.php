<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use GuzzleHttp\Client;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\Row;

/**
 * Panel destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:panel",
 * )
 */
class Panel extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {

  /**
   * {@inheritDoc}
   */
  public function setRelatedFields(Row $row, $entity) : EntityInterface {
    \Drupal::logger(__CLASS__)
      ->debug('Getting Related Fields:' . \Kint::dump($row, TRUE));
    $entity->set('field_event', $this->getEvent($row));
    $entity->set('field_room', $this->getRoom($row));
    \Drupal::logger(__CLASS__)
      ->debug('Related Fields updated:' . \Kint::dump($row, TRUE));
    return $entity;
  }

  /**
   * {@inheritDoc}
   */
  public function getBundle(Row $row = NULL) {
    return "panel";
  }

  /**
   * Get related record for room.
   *
   * @param \Drupal\migrate\Row $row
   *   Standard Migration row object.
   */
  public function getRoom(Row $row) {
    $filter = [
      "filter" => [
        "panel_id" => $row->get('pid'),
      ],
    ];
    $response = json_decode(
      $this->getClient($row)
        ->get('/jsonapi/panel/rooms', ['query' => $filter])
        ->getBody(),
      TRUE
    );
    if (is_array($response['data']) && count($response['data']) >= 1 && $panelRoom = array_shift($response['data'])) {
      \Drupal::logger(__CLASS__)
        ->debug('Getting Related Fields:' . \Kint::dump($response['data'], TRUE));
      $entityStorage = \Drupal::getContainer()
        ->get('entity_type.manager')
        ->getStorage('rooms');
      $results = $entityStorage->getQuery()
        ->condition('field_room_id', $panelRoom['attributes']['room_id'])
        ->execute();
      if (is_array($results) && count($results) >= 1 && $resultID = array_shift($results)) {
        $entity = $entityStorage->load($resultID);
        if ($entity instanceof EntityInterface) {
          $toReturn = ['target_id' => $entity->id()];
          $row->setDestinationProperty('field_room', $toReturn);
          return $toReturn;
        }
      }
    }
    return [];
  }

  /**
   * Create reference to event entity.
   *
   * @param \Drupal\migrate\Row $row
   *   Standard migration row.
   *
   * @return array|null
   *   Either return an array of dependent entities or null.
   */
  public function getEvent(Row $row) {
    $entityStorage = \Drupal::getContainer()
      ->get('entity_type.manager')
      ->getStorage('event');
    $results = $entityStorage
      ->getQuery()
      ->condition('field_grid_event_id', $row->getSource()['eventid'])
      ->execute();
    \Drupal::logger(__CLASS__)
      ->debug('Found the following values:' . \Kint::dump($results, TRUE));
    if (is_array($results) && count($results) >= 1 && $resultID = array_shift($results)) {
      $entity = $entityStorage->load($resultID);
      \Drupal::logger(__CLASS__)
        ->debug('Adding value to result set:' . \Kint::dump($resultID, TRUE));
      if ($entity instanceof EntityInterface) {
        $row->setDestinationProperty('field_event', ['target_id' => $entity->id()]);
        return $entity;
      }
    }
    return [];
  }

  /**
   * Get http client for jsonapi call.
   *
   * @param \Drupal\migrate\Row $row
   *   Standard migration row.
   *
   * @return \GuzzleHttp\Client
   *   Guzzle http client.
   */
  protected function getClient(Row $row) {
    return new Client([
      "base_uri" => $row->get('jsonapi_host'),
    ]);
  }

}
