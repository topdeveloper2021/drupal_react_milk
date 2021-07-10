<?php

namespace Drupal\milken_migrate\EventSubscriber;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigratePostRowSaveEvent;
use Drupal\migrate\Event\MigratePreRowSaveEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Migrate Row Subscriber.
 *
 * @package Drupal\milken_migrate
 */
class MigrateRowSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritDoc}
   */
  public static function getSubscribedEvents() {
    return [
      // MigrateEvents::PRE_ROW_SAVE => 'preRowSave',.
      MigrateEvents::POST_ROW_SAVE => 'postRowSave',
    ];
  }

  /**
   * Triggered before each row saves its data.
   *
   * @param \Drupal\migrate\Event\MigratePreRowSaveEvent $event
   *   Event object.
   */
  public function preRowSave(MigratePreRowSaveEvent $event) {
    $row = $event->getRow();
    $message = "PreSave: " . $event->getMigration()->id() . " row: " . $row->getDestinationProperty('uuid');
    $message .= print_r($row->getDestination(), TRUE);
    // @codingStandardsIgnoreStart
    \Drupal::logger('milken_migrate')
      ->info($message);
    // @codingStandardsIgnoreEnd

  }

  /**
   * Triggered before each row saves its data.
   *
   * @param \Drupal\migrate\Event\MigratePostRowSaveEvent $event
   *   Event object.
   */
  public function postRowSave(MigratePostRowSaveEvent $event) {
    $row = $event->getRow();
    $message = "PostSave: " . $event->getMigration()->id() . " row: " . $row->getDestinationProperty('uuid') . PHP_EOL;
    $saved = \Drupal::entityTypeManager()->getStorage('node')->loadMultiple($event->getDestinationIdValues());
    foreach ($saved as $value) {
      if ($value instanceof EntityInterface) {
        $message .= print_r($value->toArray(), TRUE);
      }
    }
    // @codingStandardsIgnoreStart
    \Drupal::logger('milken_migrate')
      ->info($message);
    // @codingStandardsIgnoreEnd

  }

}
