<?php

namespace Drupal\milken_base\AccessControlHandler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\media\MediaTypeAccessControlHandler;

/**
 * Access controller for the MediaType entity.
 *
 * @see \Drupal\media\Entity\MediaType.
 */
class OverrideMediaTypeAccessControlHandler extends MediaTypeAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\media\Entity\MediaType. $entity */
    if ($operation === 'view') {
      return AccessResult::allowedIfHasPermission($account, 'view media');
    }
    return parent::checkAccess($entity, $operation, $account);
  }

}
