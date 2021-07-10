<?php

namespace Drupal\milken_migrate\Utility;

/**
 * Gets an iterator that allows you get a remote JSONAPI response list.
 */
class RemoteRecordsList implements \Iterator {

  /**
   * Entity Type Id.
   *
   * @var string
   */
  protected string $entity;
  /**
   * Bundle Type Id.
   *
   * @var string
   */
  protected string $bundle;

  /**
   * List of UUID's of remote content.
   *
   * @var array
   */
  protected array $records = [];
  /**
   * Pointer to the active iterator item.
   *
   * @var int
   */
  protected int $pointer;

  /**
   * RemoteRecordList constructor.
   *
   * @param string $entity
   *   Required Value.
   * @param string $bundle
   *   Required Value.
   */
  public function __construct(string $entity, string $bundle) {
    $this->entity = $entity;
    $this->bundle = $bundle;
  }

  /**
   * Load list of UUIDs from remote site.
   */
  public function refresh(): int {
    $next = $this->getUrl();
    do {
      $result = \Drupal::httpClient()->get($next);
      $list = json_decode(
        $result->getBody(),
        TRUE,
        512,
        JSON_THROW_ON_ERROR
      );
      $this->records = array_merge($this->records,
        array_map(
          function ($recordData) {
            return $recordData['id'];
          },
          $list['data'])
      );
      \Drupal::logger('milken_migrate:singlefield')
        ->debug(sprintf("Found %d records", $this->count()) . PHP_EOL);
      $next = $list['links']['next']['href'] ?? NULL;
    } while ($next !== NULL);
    return count($this->records);
  }

  /**
   * Get the URL of the entity's JSONAPI record.
   *
   * @param string $uuid
   *   UUID from old site.
   *
   * @return string
   *   JsonAPI url to old site record.
   */
  protected function getUrl(string $uuid = NULL): string {
    return sprintf("/jsonapi/%s/%s/%s", $this->entity, $this->bundle, $uuid) . "?jsonapi_include=true";
  }

  /**
   * Get number of records in iterator.
   *
   * @return int
   *   Number of records currently in iterator.
   */
  public function count(): int {
    return count($this->records);
  }

  /**
   * {@inheritDoc}
   */
  public function next(): void {
    $this->pointer += 1;
  }

  /**
   * {@inheritDoc}
   */
  public function current(): ?RemoteRecord {
    return RemoteRecord::fromUrl(
        $this->getUrl(
          $this->records[$this->pointer]
        )
      ) ?? NULL;
  }

  /**
   * {@inheritDoc}
   */
  public function key(): int {
    return $this->pointer;
  }

  /**
   * {@inheritDoc}
   */
  public function rewind(): void {
    $this->pointer = 0;
    if (count($this->records) === 0) {
      $this->refresh();
    }
  }

  /**
   * {@inheritDoc}
   */
  public function valid(): bool {
    return isset($this->records[$this->pointer]);
  }

  /**
   * Add record.
   *
   * @param string $uuid
   *   The UUID.
   */
  public function addRecord(string $uuid) {
    $this->records[] = $uuid;
  }

}
