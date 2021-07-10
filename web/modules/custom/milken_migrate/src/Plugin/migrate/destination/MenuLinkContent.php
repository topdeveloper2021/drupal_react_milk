<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\menu_link_content\MenuLinkContentInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\migrate\Row;

/**
 * Panel destination plugin.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:menu_link_content",
 * )
 */
class MenuLinkContent extends MilkenMigrateDestinationBase implements ContainerFactoryPluginInterface {

  /**
   * Import function.
   *
   * @param \Drupal\migrate\Row $row
   *   Row object.
   * @param array $old_destination_id_values
   *   Array of old values.
   *
   * @return array|bool
   *   Return array.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\migrate\Exception\EntityValidationException
   * @throws \Drupal\migrate\MigrateException
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    \Drupal::logger(__CLASS__)
      ->debug('Importing:' . \Kint::dump($row, TRUE));
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $parenID = FALSE;
    if ($row->hasDestinationProperty('parent')) {
      [$parentEntityType, $parentUUID] = explode(":",
        $row->getDestinationProperty('parent'));
      $parent = \Drupal::entityTypeManager()
        ->getStorage($parentEntityType)
        ->loadByProperties(['uuid' => $parentUUID]);
      if (count($parent)) {
        $parent = array_shift($parent);
      }
      if ($parent instanceof EntityInterface) {
        $parenID = $parent->id();
      }
    }

    $entity = \Drupal::entityTypeManager()
      ->getStorage('menu_link_content')
      ->create([
        'uuid' => $row->getDestinationProperty('uuid'),
        'title' => $row->getDestinationProperty('title'),
        'label' => $row->getDestinationProperty('title'),
        'name' => $row->getDestinationProperty('title'),
        'link' => $row->getDestinationProperty('link'),
        'menu_name' => $row->getDestinationProperty('menu_name'),
        'expanded' => FALSE,
        'weight' => $row->getDestinationProperty('weight'),
        'langcode' => 'en',
        'enabled' => $row->getDestinationProperty('enabled'),
        'changed' => $row->getDestinationProperty('changed'),
        'parent' => $parenID,
      ]);
    if (!$entity instanceof MenuLinkContentInterface) {
      throw new MigrateException('Unable to create Entity: ' . \Kint::dump($row, TRUE));
    }
    assert($entity instanceof MenuLinkContentInterface, "Cannot get the entity object");
    \Drupal::logger(__CLASS__)
      ->debug('Related Fields set:' . \Kint::dump($row, TRUE));
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    \Drupal::logger(__CLASS__)
      ->debug('saving these values:' . \Kint::dump($entity->toArray(), TRUE));
    $ids = $this->save($entity, $old_destination_id_values);
    $map['destid1'] = $entity->id();
    $row->setIdMap($map);
    $this->setRollbackAction($map,
      $entity->isNew() ?
        MigrateIdMapInterface::ROLLBACK_DELETE :
        MigrateIdMapInterface::ROLLBACK_PRESERVE
    );
    return $ids;
  }

  /**
   * Implementation of SetRelatedFields.
   *
   * @param \Drupal\migrate\Row $row
   *   Row object.
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   Entity Interface.
   *
   * @return \Drupal\Core\Entity\EntityInterface
   *   The provided entity with alterations.
   */
  public function setRelatedFields(Row $row, EntityInterface $entity): EntityInterface {
    return $entity;
  }

}
