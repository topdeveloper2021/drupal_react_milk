<?php

namespace Drupal\milken_base\AccessControlHandler;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;

/**
 * Access controller for the Event entity.
 *
 * @see \Drupal\media\Entity\MediaType.
 */
class OverrideEventTypeAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritDoc}
   */
  public function access(EntityInterface $entity, $operation, AccountInterface $account = NULL, $return_as_object = FALSE) {
    if ($operation === 'view') {
      return AccessResult::allowedIfHasPermission($account, 'access content');
    }
    // @todo Change the autogenerated stub.
    return parent::access($entity, $operation, $account, $return_as_object);
  }

}
