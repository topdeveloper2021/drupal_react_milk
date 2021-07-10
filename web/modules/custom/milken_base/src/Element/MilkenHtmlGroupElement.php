<?php

namespace Drupal\milken_base\Element;

use Drupal\Core\Form\FormStateInterface;
use Drupal\field_group\Element\HtmlElement;

/**
 * HTML Group Element.
 *
 * @Class MilkenHtmlGroupElement
 */
class MilkenHtmlGroupElement extends HtmlElement {

  /**
   * Process html Element.
   *
   * @param array $element
   *   Element array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Object that holds the form state.
   *
   * @return array
   *   Returns render array.
   */
  public static function processHtmlElement(array &$element, FormStateInterface $form_state) {
    $toReturn = parent::processHtmlElement($element, $form_state);
    return $toReturn;
  }

}
