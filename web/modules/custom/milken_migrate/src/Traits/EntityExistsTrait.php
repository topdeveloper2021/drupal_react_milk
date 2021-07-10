<?php

namespace Drupal\milken_migrate\Traits;

use Drupal\Core\Entity\EntityInterface;

/**
 * Provides Entity Exists Trait.
 *
 * @package Drupal\milken_migrate\Traits
 */
trait EntityExistsTrait {

  /**
   * Check to see if the UUID of an entity has already been imported.
   *
   * @param string $entityTypeID
   *   Entity Type ID.
   * @param string $uuid
   *   UUID.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   Returns null or the found entity.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function entityExixsts(string $entityTypeID, string $uuid): ?EntityInterface {
    $exists = $this->entityTypeManager
      ->getStorage($entityTypeID)
      ->loadByProperties(['uuid' => $uuid]);
    if (count($exists)) {
      $entity = array_shift($exists);
      \Drupal::logger('milken_migrate')
        ->debug("Found {$entityTypeID} in database: " . $entity->label());
      return $entity;
    }
    return NULL;
  }

}
