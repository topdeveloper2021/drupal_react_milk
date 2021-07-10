<?php
// phpcs:ignoreFile

namespace Drupal\milken_migrate\Utility;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Url;

/**
 * Class RemoteRecord
 *
 * @package Drupal\milken_migrate\Utility
 */
class RemoteRecord extends DrupalBaseRemoteRecord {

  /**
   * @param $string
   *
   * @return \Drupal\milken_migrate\Utility\RemoteRecord|null
   */
  public static function fromJson($string): ?RemoteRecord {
    try {
      return new static(json_decode($string, true));
    } catch(\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error($e->getMessage());
    } catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->critical($t->getMessage());
    }
    return null;
  }

  public function getLocalVersion($localEntityTypeId): ?EntityInterface {
    $exists = \Drupal::entityTypeManager()->getStorage($localEntityTypeId)
      ->loadByProperties(['uuid' => $this->getId()]);
    if (count($exists)) {
      return reset($exists);
    }
    return null;
  }

  public static function fromUrl(string $url): ?RemoteRecord {
    try {
      $parsed = new \Wa72\Url\Url($url);
      $parsed->setQueryParameter('jsonapi_include', true);
      //\Drupal::logger('milken_migrate')
      //  ->debug("URL: " . print_r($parsed, true));
      $response = \Drupal::httpClient()->get($parsed->toPsr7());
      // to see this print out, do drush COMMAND --verbose --debug
      // \Drupal::logger('milken_migrate')
      //  ->debug((string) $response->getBody());
      $responseArray = json_decode($response->getBody(), true);
      if (isset($responseArray['data']) && empty($responseArray['data'])) {
        return null;
      }
      return new static($responseArray['data']);
    } catch(\Exception $e) {
      \Drupal::logger('milken_migrate')
        ->error($e->getMessage());
    } catch (\Throwable $t) {
      \Drupal::logger('milken_migrate')
        ->critical($t->getMessage());
    }
    return null;
  }


  public static function getRemoteRecord(string $entity, string $bundle, string $id = null) : ? RemoteRecord {
    $entityUrl = sprintf('/jsonapi/%s/%s/%s',
      $entity,
      $bundle,
      $id
    );
    \Drupal::logger('milken_migrate')
      ->debug(sprintf("Getting record from %s", $entityUrl));
    return static::fromUrl( $entityUrl );
  }

  public function getField(string $fieldName) {
    return isset($this->otherFields[$fieldName]) ?
      $this->otherFields[$fieldName] : NULL;
  }

}
