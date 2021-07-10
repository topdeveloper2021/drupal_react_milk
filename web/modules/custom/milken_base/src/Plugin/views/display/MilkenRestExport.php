<?php

namespace Drupal\milken_base\Plugin\views\display;

use Drupal\Core\Render\RenderContext;
use Drupal\rest\Plugin\views\display\RestExport;
use Drupal\views\Render\ViewsRenderPipelineMarkup;

/**
 * The plugin that handles Data response callbacks for REST resources.
 *
 * @ingroup views_display_plugins
 *
 * @ViewsDisplay(
 *   id = "milken_rest_export",
 *   title = @Translation("MILKEN REST export"),
 *   help = @Translation("Create a REST export resource specific to Milken Website."),
 *   uses_route = TRUE,
 *   admin = @Translation("Milken REST export"),
 *   returns_response = TRUE
 * )
 */
class MilkenRestExport extends RestExport {

  /**
   * Render Function.
   */
  public function render() {
    $build = [];
    $build['#markup'] = $this->renderer->executeInRenderContext(new RenderContext(), function () {
      return $this->view->style_plugin->render();
    });
    $toReturn = [];
    // Decode results.
    $results = \GuzzleHttp\json_decode($build['#markup'], TRUE);
    $filters = [];
    foreach ($results as $result) {
      $toAdd = [];
      $uuid = (!empty($result['uuid'])) ? $result['uuid'] : (!empty($result['uuid_1']) ? $result['uuid_1'] : $result['uuid_2']);

      $enityTypeId = str_replace("entity:", "", $result['search_api_datasource']);
      $entity = \Drupal::entityTypeManager()
        ->getStorage($enityTypeId)
        ->loadByProperties(['uuid' => $uuid]);
      if ($entity) {
        $entity = array_shift($entity);
        $toAdd['relevance'] = $result['search_api_relevance'];
        $toAdd['uuid'] = $entity->uuid();
        $toAdd['entityTypeId'] = $entity->getEntityTypeId();
        $toAdd['bundle'] = $entity->bundle();
        $toAdd['id'] = $entity->uuid();
        $toAdd['label'] = $entity->label();
        $toAdd['excerpt'] = $result['search_api_excerpt'];
        $toAdd['url'] = $result['url'];
        // $toAdd['values'] = $entity->toArray();
        $filters[$toAdd['entityTypeId']][$toAdd['bundle']] += 1;
      }
      $toReturn['data'][] = $toAdd;
    }
    $toReturn['filters'] = [
      [
        'facetTypeName' => "Content Type",
        'facetTypeID' => 'type',
        'items' => array_values($filters),
      ],
    ];

    // Convert back to JSON.
    $build['#markup'] = \GuzzleHttp\json_encode($toReturn);

    $this->view->element['#content_type'] = $this->getMimeType();

    // Encode and wrap the output in a pre tag if this is for a live preview.
    if (!empty($this->view->live_preview)) {
      $build['#prefix'] = '<pre>';
      $build['#plain_text'] = $build['#markup'];
      $build['#suffix'] = '</pre>';
      unset($build['#markup']);
    }
    elseif ($this->view->getRequest()
      ->getFormat($this->view->element['#content_type']) !== 'html') {
      // This display plugin is primarily for returning non-HTML formats.
      // However, we still invoke the renderer to collect cacheability metadata.
      // Because the renderer is designed for HTML rendering, it filters
      // #markup for XSS unless it is already known to be safe, but that filter
      // only works for HTML. Therefore, we mark the contents as safe to bypass
      // the filter. So long as we are returning this in a non-HTML response
      // (checked above), this is safe, because an XSS attack only works when
      // executed by an HTML agent.
      // @todo Decide how to support non-HTML in the render API in
      //   https://www.drupal.org/node/2501313.
      $build['#markup'] = ViewsRenderPipelineMarkup::create($build['#markup']);
    }

    parent::applyDisplayCacheabilityMetadata($build);

    return $build;

  }

  /**
   * Create simple array syntax for entity values.
   */
  public function simplifyValuesArray($incoming) {
    if (is_array($incoming) && isset($incoming[0]['value'])) {
      return $incoming[0]['value'];
    }
    return $incoming;
  }

}
