<?php

/**
 * @file
 * Contains milken_base.theme.
 */

use Drupal\views_bootstrap\ViewsBootstrap;

/**
 * Prepares variables for views carousel template.
 *
 * Default template: views-bootstrap-carousel.html.twig.
 *
 * @param array $vars
 *   An associative array containing:
 *   - view: A ViewExecutable object.
 *   - rows: The raw row data.
 */
function template_preprocess_milken_bootstrap_carousel(array &$vars) {
  $view = $vars['view'];
  $vars['id'] = ViewsBootstrap::getUniqueId($view);
  $vars['attributes']['class'][] = 'views-bootstrap-media-object';
  $vars['attributes']['class'][] = 'media-list';

  // Carousel options.
  $vars['interval'] = $view->style_plugin->options['interval'];
  $vars['navigation'] = $view->style_plugin->options['navigation'];
  $vars['indicators'] = $view->style_plugin->options['indicators'];
  $vars['pause'] = $view->style_plugin->options['pause'] ? 'hover' : FALSE;
  $vars['wrap'] = $view->style_plugin->options['wrap'];
  $vars['effect'] = $view->style_plugin->options['effect'];
  $vars['use_caption'] = $view->style_plugin->options['use_caption'];
  $vars['ride'] = $view->style_plugin->options['ride'];

  // Carousel rows.
  // $image = $view->style_plugin->options['image'];
  // $title = $view->style_plugin->options['title'];
  // $description = $view->style_plugin->options['description'];
  // $fieldLabels = $view->display_handler->getFieldLabels(TRUE);
}
