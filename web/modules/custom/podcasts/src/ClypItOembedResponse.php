<?php
// phpcs:ignoreFile
namespace Drupal\podcasts;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

/**
 * Class ClypItOembedResponse.
 *
 * @package Drupal\podcasts
 */
class ClypItOembedResponse {

  /**
   * @var
   */
  protected $Status;

  /**
   * @var
   */
  protected $CommentsEnabled;

  /**
   * @var
   */
  protected $Category;

  /**
   * @var
   */
  protected $AudioFileId;

  /**
   * @var
   */
  protected $Title;

  /**
   * @var
   */
  protected $Description;

  /**
   * @var
   */
  protected $Duration;

  /**
   * @var
   */
  protected $Url;

  /**
   * @var
   */
  protected $ArtworkPictureUrl;

  /**
   * @var
   */
  protected $Mp3Url;

  /**
   * @var
   */
  protected $SecureMp3Url;

  /**
   * @var
   */
  protected $OggUrl;

  /**
   * @var
   */
  protected $SecureOggUrl;

  /**
   * @var
   */
  protected $DateCreated;

  /**
   * @var array
   */
  protected $oddsNEnds = [];

  /**
   * ClypItOembedResponse constructor.
   *
   * @param $incoming
   */
  public function __construct($incoming) {
    foreach ($incoming as $key => $value) {
      $func = "set{$key}";
      if (method_exists($this, $func)) {
        $this->{$func}($value);
      }
      else {
        $this->oddsNEnds[$key] = $value;
      }
    }
  }

  /**
   * @param $id
   *
   * @return static|null
   * @throws \GuzzleHttp\Exception\GuzzleException
   */
  public static function fromId($id) {
    try {
      $client = new Client();
      $res = $client->request('GET', 'https://api.clip.it/${id}');
      return new static(json_decode($res->getBody(), TRUE));
    }
    catch (ClientException $e) {
      \Drupal::logger(__CLASS__)->error($e->getMessage());
    }
    return NULL;
  }

  /***
   * @return string|null
   */
  public function getStatus(): ?string {
    return $this->Status;
  }

  /**
   * @param string $Status
   */
  public function setStatus(string $Status): void {
    $this->Status = $Status;
  }

  /**
   * @return bool|null
   */
  public function getCommentsEnabled(): ?bool {
    return $this->CommentsEnabled;
  }

  /**
   * @param bool $CommentsEnabled
   */
  public function setCommentsEnabled(bool $CommentsEnabled): void {
    $this->CommentsEnabled = $CommentsEnabled;
  }

  /**
   * @return string|null
   */
  public function getCategory(): ?string {
    return $this->Category;
  }

  /**
   * @param string $Category
   */
  public function setCategory(string $Category): void {
    $this->Category = $Category;
  }

  /**
   * @return string
   */
  public function getAudioFileId(): string {
    return $this->AudioFileId;
  }

  /**
   * @param string $AudioFileId
   */
  public function setAudioFileId(string $AudioFileId): void {
    $this->AudioFileId = $AudioFileId;
  }

  /**
   * @return string
   */
  public function getTitle(): string {
    return $this->Title;
  }

  /**
   * @param string $Title
   */
  public function setTitle(string $Title): void {
    $this->Title = $Title;
  }

  /**
   * @return string|null
   */
  public function getDescription(): ?string {
    return $this->Description;
  }

  /**
   * @param string $Description
   */
  public function setDescription(string $Description): void {
    $this->Description = $Description;
  }

  /**
   * @return float|null
   */
  public function getDuration(): ?float {
    return $this->Duration;
  }

  /**
   * @param float $Duration
   */
  public function setDuration(float $Duration): void {
    $this->Duration = $Duration;
  }

  /**
   * @return mixed
   */
  public function getUrl() {
    return $this->Url;
  }

  /**
   * @param string $Url
   */
  public function setUrl(string $Url): void {
    $this->Url = $Url;
  }

  /**
   * @return string|null
   */
  public function getArtworkPictureUrl(): ?string {
    return $this->ArtworkPictureUrl;
  }

  /**
   * @param string $ArtworkPictureUrl
   */
  public function setArtworkPictureUrl(string $ArtworkPictureUrl): void {
    $this->ArtworkPictureUrl = $ArtworkPictureUrl;
  }

  /**
   * @return string|null
   */
  public function getMp3Url(): ?string {
    return $this->Mp3Url;
  }

  /**
   * @param string $Mp3Url
   */
  public function setMp3Url(string $Mp3Url): void {
    $this->Mp3Url = $Mp3Url;
  }

  /**
   * @return string|null
   */
  public function getSecureMp3Url(): ?string {
    return $this->SecureMp3Url;
  }

  /**
   * @param string $SecureMp3Url
   */
  public function setSecureMp3Url(string $SecureMp3Url): void {
    $this->SecureMp3Url = $SecureMp3Url;
  }

  /**
   * @return string|null
   */
  public function getOggUrl(): ?string {
    return $this->OggUrl;
  }

  /**
   * @param string $OggUrl
   */
  public function setOggUrl(string $OggUrl): void {
    $this->OggUrl = $OggUrl;
  }

  /**
   * @return string|null
   */
  public function getSecureOggUrl(): ?string {
    return $this->SecureOggUrl;
  }

  /**
   * @param string $SecureOggUrl
   */
  public function setSecureOggUrl(string $SecureOggUrl): void {
    $this->SecureOggUrl = $SecureOggUrl;
  }

  /**
   * @return \DateTime|null
   */
  public function getDateCreated(): ?\DateTime {
    return $this->DateCreated;
  }

  /**
   * @param \DateTime $DateCreated
   */
  public function setDateCreated(\DateTime $DateCreated): void {
    $this->DateCreated = $DateCreated;
  }

}
