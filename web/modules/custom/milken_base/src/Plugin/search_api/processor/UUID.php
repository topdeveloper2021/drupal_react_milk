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
 *   id = "uuid",
 *   label = @Translation("Uuid"),
 *   description = @Translation("Adds the entity uuid to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class UUID extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('UUID'),
        'description' => $this->t('The entity UUID of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_uuid'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $uuid = $item->getOriginalObject(TRUE)->getEntity()->uuid();
    if ($uuid) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_uuid');
      foreach ($fields as $field) {
        $field->addValue($uuid);
      }
    }
  }

}
