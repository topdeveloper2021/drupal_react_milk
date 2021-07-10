<?php

namespace Drupal\milken_base\Plugin\search_api\processor;

use Drupal\milken_base\Plugin\search_api\processor\Property\AddEntityTypeIdProperty;
use Drupal\search_api\Datasource\DatasourceInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;
use Drupal\search_api\Item\ItemInterface;

/**
 * Adds the item's URL to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "jsonapi_type",
 *   label = @Translation("JSONAPI Type"),
 *   description = @Translation("Adds the 'type' to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class JSONAPIType extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Type'),
        'description' => $this->t('The [entityTypeId--bundle] of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_jsonapi_type'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $entityTypeId = $item->getDatasource()->getEntityTypeId();
    $orig = $item->getOriginalObject(TRUE)->getEntity();
    $type = $entityTypeId . "--" . $orig->bundle();
    if ($type) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_jsonapi_type');
      foreach ($fields as $field) {
        $field->addValue($type);
      }
    }
  }

}
