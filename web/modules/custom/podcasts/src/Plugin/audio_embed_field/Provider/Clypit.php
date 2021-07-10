<?php

namespace Drupal\podcasts\Plugin\audio_embed_field\Provider;

use Drupal\audio_embed_field\ProviderPluginBase;
use Drupal\podcasts\ClypItOembedResponse;
use GuzzleHttp\Exception\ClientException;

/**
 * A Clyp.it provider plugin.
 *
 * @AudioEmbedProvider(
 *   id = "clypit",
 *   title = @Translation("Clypit")
 * )
 */
class Clypit extends ProviderPluginBase {

  /**
   * {@inheritdoc}
   */
  public function renderEmbedCode($width, $height, $autoplay) {
    if ($autoplay == 0) {
      $autoplay = 'false';
    }
    if ($autoplay == 1) {
      $autoplay = 'true';
    }
    $embed_code = [
      '#type' => 'audio_embed_iframe',
      '#provider' => 'clypit',

      '#url' => sprintf('https://api.clyp.it/', $this->getAudioId()),
      '#query' => [
        'auto_play' => $autoplay,
        'visual' => 'true',
        'show_user' => 'false',
        'show_reposts' => 'false',
        'hide_related' => 'true',
        'show_comments' => 'false',
      ],
      '#attributes' => [
        'width' => $width,
        'height' => $height,
        'frameborder' => '0',
      ],
    ];

    return $embed_code;
  }

  /**
   * {@inheritdoc}
   */
  public function getRemoteThumbnailUrl() : string {
    try {
      $oembedResponse = ClypItOembedResponse::fromId(static::getIdFromInput($this->getInput()));
      return $oembedResponse->getArtworkPictureUrl();
    }
    catch (ClientException $e) {
      return NULL;
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getIdFromInput($input) {

    try {
      // Expectation: https://clyp.it/4w3hvq0j
      $parsed = parse_url($input);
      return str_replace("/", "", $parsed['path']);
    }
    catch (ClientException $e) {
      return NULL;
    }
  }

}
