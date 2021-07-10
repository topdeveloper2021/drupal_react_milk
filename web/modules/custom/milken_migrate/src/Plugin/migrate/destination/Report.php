<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\Row;

/**
 * Provides Event destination.
 *
 * Use this plugin for a table not registered with Drupal Schema API.
 *
 * @MigrateDestination(
 *   id = "milken_migrate:media",
 * )
 */
class Report extends MilkenMigrateDestinationBase {

  /**
   * Static entity type.
   *
   * @var string
   */
  protected $entityType = "media";

  /**
   * Get Bundle Type ID.
   *
   * @param \Drupal\migrate\Row $row
   *   The row object.
   *
   * @return string
   *   String.
   */
  public function getBundle(Row $row) {
    return "report";
  }

  /**
   * {@inheritDoc}
   */
  public function setRelatedFields(Row $row, EntityInterface $entity): EntityInterface {
    return $entity;
  }

}
