<?php

namespace Drupal\milken_base\AccessControlHandler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\system\MenuAccessControlHandler;

/**
 * Access controller for the Menu entity.
 *
 * @see \Drupal\system\Entity\Menu.
 */
class OverrideMenuAccessControlHandler extends MenuAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    if ($operation === 'view') {
      return AccessResult::allowedIfHasPermission($account, 'view media');
    }
    return parent::checkAccess($entity, $operation, $account);
  }

}
