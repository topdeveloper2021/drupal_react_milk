<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Component\Plugin\ConfigurableInterface;
use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\entity_embed\Exception\EntityNotFoundException;
use Drupal\entity_reference_revisions\Plugin\migrate\destination\EntityReferenceRevisions;
use Drupal\migrate\MigrateSkipRowException;
use Drupal\milken_migrate\Traits\EntityExistsTrait;

/**
 * Supplies Paragraph Class.
 *
 * @package Drupal\milken_migrate\Plugin\migrate\destination
 *
 * @MigrateDestination(
 *   id = "milken_reference_revisions",
 *   deriver = "Drupal\entity_reference_revisions\Plugin\Derivative\MigrateEntityReferenceRevisions"
 * )
 */
class Paragraphs extends EntityReferenceRevisions implements ConfigurableInterface {

  use EntityExistsTrait;

  /**
   * {@inheritdoc}
   */
  protected function save(ContentEntityInterface $entity, array $oldDestinationIdValues = []) {
    $exists = $this->entityExixsts('paragraphs', $entity->uuid());
    if ($exists instanceof EntityInterface) {
      throw new MigrateSkipRowException("Paragraph exists");
    }
    try {
      $entity->save();
    }
    catch (EntityNotFoundException $e) {
      exit();
    }

    return [
      $this->getKey('id') => $entity->id(),
      $this->getKey('revision') => $entity->getRevisionId(),
    ];
  }

}
