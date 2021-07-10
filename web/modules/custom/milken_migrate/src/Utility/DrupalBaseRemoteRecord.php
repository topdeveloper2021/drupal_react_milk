<?php
// phpcs:ignoreFile

namespace Drupal\milken_migrate\Utility;

use Drupal\facets\Exception\Exception;

/**
 *
 */
abstract class DrupalBaseRemoteRecord {

  /**
   * @var string
   */
  protected ?string $entityTypeId = null;

  /**
   * @var string
   */
  protected ?string $bundleId = null;

  /**
   * @var string
   */
  protected ?string $id = null;

  /**
   * @var array
   */
  protected array $links;

  /**
   * @var bool
   */
  protected bool $status;

  /**
   * @var int
   */
  protected int $drupal_internal__id;

  /**
   * @var string
   */
  protected string $label;

  /**
   * @var string
   */
  protected string $description;

  /**
   * @var array
   */
  protected $otherFields = [];

  /**
   * DrupalBaseRemoteRecord constructor.
   *
   * @param $keyValues
   */
  function __construct(array $keyValues) {
    isset($keyValues["id"]) ? $this->setId($keyValues["id"]) : new \Exception('No ID in remote record values');
    isset($keyValues["type"]) ? $this->setType($keyValues["type"]) : new \Exception('no TYPE value in remote record key=> values');
    foreach ($keyValues as $key => $value) {
      $funcName = "set" . ucfirst($key);
      if (method_exists($this, $funcName)) {
        call_user_func_array([$this, $funcName], [$value]);
      }
      else {
        $this->otherFields[$key] = $value;
      }
    }
  }

  public function __set($name, $value) {
    $this->{$name} = $value;
  }

  public function __get($name) {
    return $this->{$name};
  }

  /**
   * Basic type-checking the two required properties.
   *
   * @return bool
   */
  public function valid(): bool {
    return (
      \strlen($this->getType()) >= 2 &&
      $this->getId() &&
      (preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/', $this->getId()) === 1)
    );
  }

  /**
   * Get the JSONAPI type value.
   *
   * @return string
   */
  public function getType(): string {
    return sprintf("%s--%s", $this->entityTypeId, $this->bundleId);
  }

  /**
   * Set the jsonapi type value.
   *
   * @param string $type
   */
  public function setType(string $type): void {
    [$this->entityTypeId, $this->bundleId] = explode("--", $type);
  }

  /**
   * @return string
   */
  public function getId(): ?string {
    return $this->id;
  }

  /**
   * @param string $id
   */
  public function setId(string $id): void {
    $this->id = $id;
  }

  /**
   * @return array
   */
  public function getLinks(): array {
    return $this->links;
  }

  /**
   * @param array $links
   */
  public function setLinks(array $links): void {
    $this->links = $links;
  }

  /**
   * @return bool
   */
  public function isStatus(): bool {
    return $this->status;
  }

  /**
   * @param bool $status
   */
  public function setStatus(bool $status): void {
    $this->status = $status;
  }

  /**
   * @return array
   */
  public function getDependencies(): array {
    return $this->dependencies;
  }

  /**
   * @param array $dependencies
   */
  public function setDependencies(array $dependencies): void {
    $this->dependencies = $dependencies;
  }

  /**
   * @return int
   */
  public function getDrupalInternalId(): int {
    return $this->drupal_internal__id;
  }

  /**
   * @param int $drupal_internal__id
   */
  public function setDrupalInternalId(int $drupal_internal__id): void {
    $this->drupal_internal__id = $drupal_internal__id;
  }

  /**
   * @return string
   */
  public function getLabel(): string {
    return $this->label;
  }

  /**
   * @param string $label
   */
  public function setLabel(string $label): void {
    $this->label = $label;
  }

  /**
   * @return string
   */
  public function getDescription(): string {
    return $this->description;
  }

  /**
   * @param string $description
   */
  public function setDescription(string $description): void {
    $this->description = $description;
  }


}
