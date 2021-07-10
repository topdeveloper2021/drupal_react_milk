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
 *   id = "label",
 *   label = @Translation("Label"),
 *   description = @Translation("Adds the Label to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class Label extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Label'),
        'description' => $this->t('The Entity Label of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_label'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $label = $item->getOriginalObject(TRUE)->getEntity()->label();
    if ($label) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_label');
      foreach ($fields as $field) {
        $field->addValue($label);
      }
    }
  }

}
