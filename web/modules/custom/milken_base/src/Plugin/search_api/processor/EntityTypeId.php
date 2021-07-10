<?php

namespace Drupal\milken_base\Plugin\search_api\processor;

use Drupal\milken_base\Plugin\search_api\processor\Property\AddEntityTypeIdProperty;
use Drupal\search_api\Datasource\DatasourceInterface;
use Drupal\search_api\Item\ItemInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;

/**
 * Adds the item's URL to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "entityTypeId",
 *   label = @Translation("EntityTypeId"),
 *   description = @Translation("Adds the entityTypeId to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class EntityTypeId extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('EntityTypeId'),
        'description' => $this->t('The entity type of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_entity_type_id'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $entityTypeId = $item->getDatasource()->getEntityTypeId();
    if ($entityTypeId) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_entity_type_id');
      foreach ($fields as $field) {
        $field->addValue($entityTypeId);
      }
    }
  }

}
