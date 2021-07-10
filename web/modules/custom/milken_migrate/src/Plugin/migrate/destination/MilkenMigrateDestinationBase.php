<?php

namespace Drupal\milken_migrate\Plugin\migrate\destination;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityFieldManager;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\MigrateException;
use Drupal\migrate\Plugin\migrate\destination\EntityContentBase;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Milken Migrate Destination Base Class.
 *
 * @package Drupal\milken_migrate\Plugin\migrate\destination
 */
abstract class MilkenMigrateDestinationBase extends EntityContentBase {

  /**
   * Container to share.
   *
   * @var \Symfony\Component\DependencyInjection\ContainerInterface
   */
  protected $container;

  /**
   * Logger.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;
  /**
   * Supports Rollback?
   *
   * @var bool
   *    Yes or no.
   */
  protected $supportsRollback = TRUE;

  /**
   * Type of Entity.
   *
   * @var \Drupal\Core\Entity\EntityTypeInterface
   *    EckEntityInterface is produced.
   */
  protected $entityType;

  /**
   * Field Manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  protected $entityFieldManager;

  /**
   * Constructs a content entity.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin ID for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\migrate\Plugin\MigrationInterface $migration
   *   The migration entity.
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   Container from which to pull all your storage needs.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration, ContainerInterface $container) {
    $entity_type = static::getEntityTypeId($plugin_id);
    $entityStorage = $container->get('entity_type.manager')->getStorage($entity_type);
    $fieldManger = $container->get('entity_field.manager');
    $fieldTypeManager = $container->get('plugin.manager.field.field_type');
    $bundles = array_keys(
      $container->get('entity_type.bundle.info')
        ->getBundleInfo($entity_type)
    );
    parent::__construct($configuration, $plugin_id, $plugin_definition,
      $migration,
      $entityStorage,
      $bundles,
      $fieldManger,
      $fieldTypeManager
    );
    $this->container = $container;
    $this->storage = $entityStorage;
    $this->entityFieldManager = $fieldManger;
    $this->fieldTypeManager = $fieldTypeManager;
    $this->logger = $container->get('logger.factory')->get(__CLASS__);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {

    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $migration,
      $container,
      array_keys($container->get('entity_type.bundle.info')
        ->getBundleInfo($entity_type)),
      $container->get('entity_field.manager'),
      $container->get('plugin.manager.field.field_type')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    $this->logger->debug('Importing:' . \Kint::dump($row, TRUE));
    $this->rollbackAction = MigrateIdMapInterface::ROLLBACK_DELETE;
    $entity = $this->getEntity($row, $old_destination_id_values);
    if (!$entity instanceof ContentEntityInterface) {
      throw new MigrateException('Unable to get entity');
    }
    assert($entity instanceof ContentEntityInterface, "Cannot get the entity object");
    $this->setRelatedFields($row, $entity);
    $this->logger->debug('Related Fields set:' . \Kint::dump($row, TRUE));
    if ($this->isEntityValidationRequired($entity)) {
      $this->validateEntity($entity);
    }
    $this->logger->debug('saving these values:' . \Kint::dump($entity->toArray(), TRUE));
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
   * Must be implemented and add any related reference fields.
   */
  abstract public function setRelatedFields(Row $row, EntityInterface $entity): EntityInterface;

  /**
   * Get a list of fields and their labels.
   *
   * @param \Drupal\migrate_plus\Entity\MigrationInterface|null $migration
   *   Migration Class Object.
   *
   * @return array|string[]|void
   *   Array of fields and their labels.
   */
  public function fields(MigrationInterface $migration = NULL) {
    if (!$this->storage->getEntityType()
      ->entityClassImplements('Drupal\Core\Entity\FieldableEntityInterface')) {
      return [];
    }
    $field_definitions = $this->getEntityFieldManager()
      ->getFieldDefinitions($this->storage->getEntityTypeId(), $this->configuration['bundle']);
    return array_map(function ($definition) {
      return (string) $definition->getLabel();
    }, $field_definitions);
  }

  /**
   * Get the entityFieldManager.
   *
   * @return \Drupal\Core\Entity\EntityFieldManager
   *   Intantiate if it doesn't already exist.
   */
  public function getEntityFieldManager(): EntityFieldManager {
    if (!$this->entityFieldManager instanceof EntityFieldManagerInterface) {
      $this->entityFieldManager = \Drupal::service('entity_field.manager');
    }
    return $this->entityFieldManager;
  }

}
