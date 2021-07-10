<?php

namespace Drupal\milken_base\Plugin\search_api\processor;

use Drupal\Core\Entity\EntityInterface;
use Drupal\milken_base\Plugin\search_api\processor\Property\AddEntityTypeIdProperty;
use Drupal\search_api\Datasource\DatasourceInterface;
use Drupal\search_api\Processor\ProcessorPluginBase;
use Drupal\search_api\Item\ItemInterface;
use Drupal\taxonomy\Entity\Term;

/**
 * Adds the item's taxonomy fields to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "taxonomy_bucket",
 *   label = @Translation("Taxonomy Bucket"),
 *   description = @Translation("Adds the 'taxonomy' to the indexed data."),
 *   stages = {
 *     "add_properties" = 0,
 *   },
 *   locked = true,
 *   hidden = true,
 * )
 */
class TaxonomyBucket extends ProcessorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getPropertyDefinitions(DatasourceInterface $datasource = NULL) {
    $properties = [];

    if (!$datasource) {
      $definition = [
        'label' => $this->t('Taxonomy'),
        'description' => $this->t('All taxonomy fields of the content/media/custom entity'),
        'type' => 'string',
        'processor_id' => $this->getPluginId(),
      ];
      $properties['search_api_taxonomy'] = new AddEntityTypeIdProperty($definition);
    }

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function addFieldValues(ItemInterface $item) {
    $valuesToIndex = [];
    $orig = $item->getOriginalObject(TRUE)->getEntity();
    if ($orig instanceof EntityInterface) {
      $referenced = $orig->referencedEntities();
      foreach ($referenced as $ref) {
        if ($ref instanceof Term) {
          array_push($valuesToIndex, $ref->label());
        }
      }
    }
    if (!empty($valuesToIndex)) {
      $fields = $item->getFields(FALSE);
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($fields, NULL, 'search_api_taxonomy');
      foreach ($fields as $field) {
        $field->addValue($valuesToIndex);
      }
    }
  }

}
