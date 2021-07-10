<?php

namespace Drupal\milken_migrate;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\migrate\MigrateSkipProcessException;
use Drupal\milken_migrate\Traits\EntityExistsTrait;
use Drupal\milken_migrate\Traits\JsonAPIDataFetcherTrait;

/**
 * Class to handle JSONAPI references.
 *
 * @class JsonAPIReference
 *
 * @package Drupal\milken_migrate
 */
class JsonAPIReference {

  use JsonAPIDataFetcherTrait;
  use EntityExistsTrait;

  /**
   * The EntityTypeManager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Drupal's UUID for entity object.
   *
   * @var string
   */
  protected $id;

  /**
   * Drupal's EntityType ID.
   *
   * @var string
   */
  protected $entityTypeId;
  /**
   * Drupal's Bundle type ID.
   *
   * @var string
   */
  protected $bundleTypeId;

  /**
   * Combination of type and bundle separated by "--".
   *
   * @var string
   */
  protected $type;

  /**
   * Drupal's bundle type.
   *
   * @var \Drupal\milken_migrate\JsonAPIReference|string
   */
  protected $bundle;

  /**
   * If reference is a file, this will have a value.
   *
   * @var array
   */
  protected $uri = [];

  /**
   * If reference is a file, this will have a value.
   *
   * @var null|string
   */
  protected $filename = NULL;

  /**
   * Any errors generated during processing.
   *
   * @var array
   */
  protected $errors = [];

  /**
   * JsonAPIReference constructor.
   *
   * @param array $values
   *   Array of values to pre-populate.
   * @param Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   Entity Type Manager.
   *
   * @throws Drupal\migrate\MigrateSkipProcessException
   */
  public function __construct(array $values = NULL, EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
    \Drupal::logger(__CLASS__)
      ->debug(__CLASS__ . "::" . print_r($values, TRUE));
    if ($values == NULL || (isset($values['data']) && empty($values['data']))) {
      throw new MigrateSkipProcessException("The referenced Entity has no data.");
    }
    $this->setValues($values);
    if ($this->getEntityTypeId() == "missing" || $this->getBundle() == "missing" || $this->getId() == "missing") {
      throw new MigrateSkipProcessException("The referenced Entity is missing on the remote server.");
    }
  }

  /**
   * Return Entity if it exists, null if it doesn't.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   EntityInterface if content is found, null if it is not.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function exists() {
    return $this->entityExixsts($this->getEntityTypeId(), $this->getId());
  }

  /**
   * Grab a file from the remote server.
   *
   * @return \Drupal\file\FileInterface|null
   *   File object if successful, null if not.
   */
  public function getRemote() {
    return $this->getRemoteFile($this->getFilename(), $this->getUrl());
  }

  /**
   * Basic validation Checks.
   *
   * @return bool
   *   Is validated?
   */
  public function valid() {
    return (isset($this->id) && is_string($this->id) && isset($this->entityTypeId) && is_string($this->entityTypeId));
  }

  /**
   * Set multiple values for object.
   *
   * @param array $values
   *   Array of Key => Value pairs.
   */
  public function setValues(array $values) {
    foreach ($values as $key => $value) {
      if ($key == "type") {
        $this->type = $value;
        [$entityTypeId, $bundleTypeId] = explode("--", $value);
        $this->setEntityTypeId($entityTypeId);
        $this->setBundleTypeId($bundleTypeId);
        continue;
      }
      if ($key == "bundle" && is_array($value)) {
        $this->setBundle($value);
        continue;
      }
      $this->{$key} = $value;
    }
  }

  /**
   * Setter.
   *
   * @param string $bundleTypeId
   *   The Bundle Type ID.
   */
  public function setBundleTypeId(string $bundleTypeId) {
    $this->bundleTypeId = $bundleTypeId;
  }

  /**
   * Getter.
   *
   * @return string
   *   The Bundle Type ID.
   */
  public function getBundleTypeId() : ?string {
    return $this->bundleTypeId;
  }

  /**
   * Make api call and get data for current ID/Type.
   *
   * @return $this
   *   Return this object.
   */
  public function getRemoteData(array $options = NULL) : JsonAPIReference {
    if ($options === NULL) {
      $options = $this->getMigrateRequestOptions();
    }
    if ($this->valid()) {
      $response = $this->getClient()
        ->get("/jsonapi/{$this->entityTypeId}/{$this->bundleTypeId}/{$this->id}", $options);
      if (in_array($response->getStatusCode(), [200, 201, 202])) {
        $responseData = json_decode($response->getBody(), TRUE);
        if (!empty($responseData['data'])) {
          $this->setValues($responseData['data']);
        }
      }
      else {
        $this->errors[$response->getStatusCode()] = $response->getReasonPhrase();
      }
    }
    return $this;
  }

  /**
   * Getter.
   *
   * @return string|null
   *   String value of ID.
   */
  public function getId(): ?string {
    return $this->id;
  }

  /**
   * Setter.
   *
   * @param string $id
   *   String value of ID.
   */
  public function setId(string $id): void {
    $this->id = $id;
  }

  /**
   * Getter.
   *
   * @return string|null
   *   String value of EntityType ID.
   */
  public function getEntityTypeId(): ?string {
    return $this->entityTypeId;
  }

  /**
   * Setter.
   *
   * @param string $entityTypeId
   *   String value of EntityTypeId.
   */
  public function setEntityTypeId(string $entityTypeId = ""): void {
    $this->entityTypeId = $entityTypeId;
  }

  /**
   * Getter.
   *
   * @return string
   *   String value of Bundle and EntityTypeID separated by "--".
   */
  public function getType(): ?string {
    return $this->type;
  }

  /**
   * Setter.
   *
   * @param string $type
   *   String value of Bundle and EntityTypeID separated by "--".
   */
  public function setType(string $type): void {
    $this->type = $type;
  }

  /**
   * Getter.
   *
   * @return string
   *   String value of the Bundle ID.
   */
  public function getBundle($entityTypeManager = NULL): ?BundleTypeDataFetcher {
    if (is_array($this->bundle)) {
      $this->bundle = new BundleTypeDataFetcher($this->bundle, $entityTypeManager);
      $this->bundle->getRemoteData();
    }
    return $this->bundle;
  }

  /**
   * Setter.
   *
   * @param string $bundle
   *   String value of the Bundle ID.
   */
  public function setBundle($bundle): void {
    if (is_array($this->bundle)) {
      $this->bundle = new BundleTypeDataFetcher($this->bundle);
      $this->bundle->getRemoteData();
    }
    else {
      $this->bundle = $bundle;
    }
  }

  /**
   * Getter.
   *
   * @return mixed|null
   *   If $this->uri has a value, return the URL property, else null.
   */
  public function getUrl(): ?string {
    return $this->uri['url'] ?? NULL;
  }

  /**
   * Getter.
   *
   * @return string|null
   *   If exists, return FILENAME property.
   */
  public function getFilename(): ?string {
    return $this->filename ?? NULL;
  }

  /**
   * Get misc property from object.
   *
   * @param string $name
   *   Name.
   */
  public function getProperty(string $name) {
    return $this->{$name} ?? NULL;
  }

}
