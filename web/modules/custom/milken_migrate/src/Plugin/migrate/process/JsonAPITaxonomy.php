<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\Core\Entity\EntityInterface;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\migrate\ProcessPluginBase;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Plugin\migrate\destination\TaxonomyTerm;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;
use Drupal\taxonomy\Entity\Term;

/**
 * This plugin gets a taxonomy term and returns the ID in a jsonAPI Migration.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:jsonapi_taxonomy",
 *   handle_multiples = true,
 * )
 */
class JsonAPITaxonomy extends ProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {

    if ($row->isStub() || (array_key_exists('data', $value) && $value['data'] === NULL) || empty($value)) {
      return NULL;
    }
    $destination_values = [];
    try {
      if (is_array($value)) {
        foreach ($value as $relatedRecord) {
          if (isset($relatedRecord['id']) && $relatedRecord['id'] != "missing") {
            $properties['uuid'] = $relatedRecord['id'];
            // If the VOCABULARY value is not set, use the value
            // from the remote site.
            if (!empty($properties)) {
              $properties['vid'] = isset($this->configuration['vocabulary']) ? $this->configuration['vocabulary'] : $vocabulary;
              $term = \Drupal::entityTypeManager()
                ->getStorage('taxonomy_term')
                ->loadByProperties($properties);
              if (count($term)) {
                $term = array_shift($term);
              }
              else {
                $related = $this->getRelatedRecordData($relatedRecord, $row, $this->configuration);
                if (isset($related['uuid'])) {
                  $term = TaxonomyTerm::create($related);
                  if ($term instanceof EntityInterface) {
                    $term->isNew();
                    $term->save();
                  }
                  else {
                    $row->setDestinationProperty($destination_property, []);
                    return new MigrateSkipProcessException(
                      "Cannot create taxonomy Term:" . print_r($relatedRecord, TRUE)
                    );
                  }
                }
              }
            }
          }
          if ($term instanceof Term) {
            $destination_values[] = $term;
          }
          else {
            return new MigrateSkipProcessException("No value can be determined for: {$destination_property}");
          }
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $e->getMessage());
      return new MigrateSkipProcessException($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error(__CLASS__ . "::IMPORT ERROR: " . $t->getMessage());
      return new MigrateSkipProcessException($t->getMessage());
    }

    // $row->setDestinationProperty($destination_property, $destination_values);
    return $destination_values;
  }

}
