<?php

namespace Drupal\milken_base;

use Drupal\Component\Serialization\Json;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\jsonapi\ResourceType\ResourceTypeRepositoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Twig extension to return a JSONAPI response from an entity.
 *
 * @package Drupal\milken_base
 */
class JSONApiTwigExtension extends AbstractExtension {

  /**
   * The HTTP kernel.
   *
   * @var \Symfony\Component\HttpKernel\HttpKernelInterface
   */
  protected $httpKernel;

  /**
   * The JSON:API Resource Type Repository.
   *
   * @var \Drupal\jsonapi\ResourceType\ResourceTypeRepositoryInterface
   */
  protected $resourceTypeRepository;

  /**
   * A Session object.
   *
   * @var \Symfony\Component\HttpFoundation\Session\SessionInterface
   */
  protected $session;

  /**
   * The current request.
   *
   * @var \Symfony\Component\HttpFoundation\Request|null
   */
  protected $currentRequest;

  /**
   * The entityType Manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * EntityToJsonApi constructor.
   *
   * @param \Symfony\Component\HttpKernel\HttpKernelInterface $http_kernel
   *   The HTTP kernel.
   * @param \Drupal\jsonapi\ResourceType\ResourceTypeRepositoryInterface $resource_type_repository
   *   The resource type repository.
   * @param \Symfony\Component\HttpFoundation\Session\SessionInterface $session
   *   The session object.
   * @param \Symfony\Component\HttpFoundation\RequestStack $request_stack
   *   The stack of requests.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The Entity Type Manager.
   */
  public function __construct(
    HttpKernelInterface $http_kernel,
    ResourceTypeRepositoryInterface $resource_type_repository,
    SessionInterface $session,
    RequestStack $request_stack,
    EntityTypeManagerInterface $entityTypeManager
  ) {
    $this->httpKernel = $http_kernel;
    $this->resourceTypeRepository = $resource_type_repository;
    $this->currentRequest = $request_stack->getCurrentRequest();
    $this->session = $this->currentRequest->hasPreviousSession()
      ? $this->currentRequest->getSession()
      : $session;
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * Config of the filter.
   *
   * @return \Twig\TwigFilter[]
   *   Returns a twig filter config.
   */
  public function getFilters() {
    return [
      new TwigFilter('jsonapi', [$this, 'fetchFromJsonApi']),
    ];
  }

  /**
   * Action of the filter.
   *
   * @param array $resource
   *   The jsonapi resource.
   * @param array $options
   *   Not used.
   *
   * @return mixed
   *   The jsonapi response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function fetchFromJsonApi(array $resource, array $options = []) {
    // @codingStandardsIgnoreStart
    try {
      $orig = $this->entityTypeManager
        ->getStorage($resource['entityTypeId'])
        ->load($resource['drupal_internal__id']);
      if ($orig instanceof EntityInterface) {
        $includes = [];
        if (isset($resource['includes']) && is_string($resource['includes'])) {
          $includes = explode(",", $resource['includes']);
        }
        $toReturn = $this->serialize($orig, $includes);
        if ($toReturn) {
          return $toReturn;
        }
      }
    } catch(\Exception $e) {
      \Drupal::logger("JSONApiTwigExtension")->error($e->getMessage());
    } catch(\Throwable $t) {
      \Drupal::logger("JSONApiTwigExtension")->error($t->getMessage());
    }
    \Drupal::logger("JSONApiTwigExtension")->debug(print_r($resource, true));
    return \Drupal::service('serialization.json')->encode($resource);
    // @codingStandardsIgnoreEnd
  }

  /**
   * Return the requested entity as a raw string.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity to generate the JSON from.
   * @param string[] $includes
   *   The list of includes.
   *
   * @return string
   *   The raw JSON string of the requested resource.
   *
   * @throws \Exception
   */
  public function serialize(EntityInterface $entity, array $includes = []) {
    // @codingStandardsIgnoreStart

    try {
      $jsonapi_url = sprintf("/jsonapi/%s/%s/%s", $entity->getEntityTypeId(), $entity->bundle(), $entity->uuid());
      $query = [
        "jsonapi_include" => TRUE,
      ];
      if ($includes) {
        $query['include'] = is_array($includes) ? implode(',', $includes) : $includes;
      }
      $request = Request::create(
        $jsonapi_url,
        'GET',
        $query,
        $this->currentRequest->cookies->all(),
        [],
        $this->currentRequest->server->all()
      );
      if ($this->session) {
        $request->setSession($this->session);
      }
      $response = $this->httpKernel->handle($request, HttpKernelInterface::SUB_REQUEST);
      return $response->getContent();
    }
    catch (\Exception $e) {
      \Drupal::logger(__CLASS__)->error($e->getMessage());
    }
    catch (\Throwable $t) {
      \Drupal::logger(__CLASS__)->error($t->getMessage());
    }
    return NULL;
    // @codingStandardsIgnoreEnd

  }

  /**
   * Return the requested entity as an structured array.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity to generate the JSON from.
   * @param string[] $includes
   *   The list of includes.
   *
   * @return array
   *   The JSON structure of the requested resource.
   *
   * @throws \Exception
   */
  public function normalize(EntityInterface $entity, array $includes = []) {
    return Json::decode($this->serialize($entity, $includes));
  }

}
