<?php

namespace Drupal\milken_base\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'oembed_thumbnail_uri' formatter.
 *
 * @FieldFormatter(
 *   id = "oembed_thumbnail_uri",
 *   label = @Translation("Oembed Thumbnail Uri"),
 *   field_types = {
 *     "string",
 *     "string_long",
 *   },
 *   quickedit = {
 *     "editor" = "plain_text"
 *   }
 * )
 */
class OEmbedThumbnailUri extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];

    foreach ($items as $delta => $item) {
      // The text value has no text format assigned to it, so the user input
      // should equal the output, including newlines.
      $elements[$delta] = [
        '#type' => 'inline_template',
        '#template' => '<img src="{{ file_url(value) }}" class="img-fluid" />',
        '#context' => ['value' => $item->value],
      ];
    }

    return $elements;
  }

}
