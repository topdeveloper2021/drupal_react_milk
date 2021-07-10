<?php

namespace Drupal\milken_base\AccessControlHandler;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\menu_link_content\MenuLinkContentAccessControlHandler;

/**
 * Access controller for the MenuLinkContent entity.
 *
 * @see \Drupal\menu_link_content\Entity\MenuLinkContent
 */
class OverrideMenuLinkContentControlHandler extends MenuLinkContentAccessControlHandler {

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
