<?php

namespace Drupal\milken_migrate\Plugin\migrate\process;

use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * This plugin gets a taxonomy term and returns the ID in a jsonAPI Migration.
 *
 * @MigrateProcessPlugin(
 *   id = "milken_migrate:taxonomy_by_name",
 *   handle_multiples=true,
 * )
 */
class TaxonomyByMachineName extends MilkenProcessPluginBase {

  use JsonAPIDataFetcherTrait;

  /**
   * The main function for the plugin, actually doing the data conversion.
   *
   * @param mixed $value
   *   The value to be processed.
   * @param \Drupal\migrate\MigrateExecutableInterface $migrate_executable
   *   Migrate Executable.
   * @param \Drupal\migrate\Row $row
   *   Row value.
   * @param string $destination_property
   *   Destination property.
   *
   * @return array|\Drupal\migrate\MigrateSkipProcessException|mixed|string
   *   Processed Value.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function transform($value, MigrateExecutableInterface $migrate_executable, Row $row, $destination_property) {
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__);
    if (
      $row->isStub() ||
      (array_key_exists('data', $value) && empty($value['data'])) ||
      empty($value)
    ) {
      return NULL;
    }
    $single_value = FALSE;
    if (!is_array($value)) {
      $value = [$value];
      $single_value = TRUE;
    }

    $destination_values = [];
    foreach ($value as $relatedRecord) {
      $term = [];
      $termName = is_array($relatedRecord) ?
        $relatedRecord['machine_name'] :
        str_replace("-", "_", $relatedRecord);

      if ($termName) {
        $term = $this->findExistingTerm($termName);
      }
      if (!count($term) && is_array($relatedRecord)) {
        $term = $this->createTerm($relatedRecord);
      }
      if (count($term)) {
        $destination_values = array_merge($destination_values, $term);
      }
    }
    if (count($destination_values) === 1 || $single_value === TRUE) {
      $destination_values = array_shift($destination_values);
    }
    \Drupal::logger('milken_migrate')
      ->debug(__CLASS__ . "::" . print_r($destination_values, TRUE));
    return $destination_values;
  }

  /**
   * Find taxonomy term by name.
   *
   * @param string $term_name
   *   Term Machine Name.
   *
   * @return array
   *   Array of TaxonomyTerms.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function findExistingTerm(string $term_name): array {
    \Drupal::logger('milken_migrate')
      ->debug("Searching For:" . $this->configuration['vocabulary'] . "::" . $term_name);
    $taxonomyStorage = $this->entityTypeManager->getStorage('taxonomy_term');
    $properties = [];
    if (!empty($this->configuration['vocabulary'])) {
      $properties['vid'] = $this->configuration['vocabulary'];
    }
    if (!empty($term_name)) {
      $properties['machine_name'] = $term_name;
      return $taxonomyStorage->loadByProperties($properties);
    }
    return [];
  }

  /**
   * Create new Taxonomy Term from termdata.
   *
   * @param array $termData
   *   Data from remote taxonomy term.
   *
   * @return array
   *   Array of Taxonomy Terms that meet the criterion.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function createTerm(array $termData) {
    try {
      \Drupal::logger('milken_migrate')
        ->debug("Searching For:" . $this->configuration['vocabulary'] . "::" . print_r($termData, TRUE));
      $termData['vid'] = $this->configuration['vocabulary'];
      return [
        $this->entityTypeManager
          ->getStorage('taxonomy_term')
          ->create($termData),
      ];
    }
    catch (\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->error($t->getMessage());
    }
    return [];
  }

}
