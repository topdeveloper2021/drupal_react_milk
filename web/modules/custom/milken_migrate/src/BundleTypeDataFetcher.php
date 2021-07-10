<?php

namespace Drupal\milken_migrate;

/**
 * Class specific to Bundle Type JSONApi Ref.
 *
 * @class BundleTypeDataFetcher
 *
 * @package Drupal\milken_migrate
 */
class BundleTypeDataFetcher extends JsonAPIReference {

  /**
   * Souce configuration.
   *
   * @var array
   *   Source configuration.
   */
  protected $sourceConfiguration = [];

  /**
   * Field map.
   *
   * @var array
   *   Field map.
   */
  protected $fieldMap = [];

  /**
   * Getter.
   *
   * @return array
   *   Source configuration.
   */
  public function getSourceConfiguration(): array {
    return $this->sourceConfiguration;
  }

  /**
   * Setter.
   *
   * @param array $source_configuration
   *   Source configuration.
   */
  public function setSourceConfiguration(array $source_configuration): void {
    $this->sourceConfiguration = $source_configuration;
  }

  /**
   * Getter.
   *
   * @return array
   *   Field map.
   */
  public function getFieldMap(): array {
    return $this->fieldMap;
  }

  /**
   * Setter.
   *
   * @param array $field_map
   *   Field map.
   */
  public function setFieldMap(array $field_map): void {
    $this->fieldMap = $field_map;
  }

  /**
   * To string.
   *
   * @return string
   *   Value as a string.
   */
  public function __toString() {
    return $this->id;
  }

}
