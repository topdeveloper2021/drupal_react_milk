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
 *   id = "bundle",
 *   label = @Translation("Bundle"),
 *   description = @Translation("Adds the entity Bundle to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class Bundle extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Bundle'),
        'description' => $this->t('The entity Bundle of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_bundle'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $bundle = $item->getOriginalObject(TRUE)->getEntity()->bundle();
    if ($bundle) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_bundle');
      foreach ($fields as $field) {
        $field->addValue($bundle);
      }
    }
  }

}
