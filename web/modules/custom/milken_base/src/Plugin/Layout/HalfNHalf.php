<?php

namespace Drupal\milken_base\Plugin\Layout;

/**
 * A custom Layout for Milken "Slides".
 *
 * @Layout(
 *   id = "half_n_half",
 *   label = @Translation("Milken Half and Half"),
 *   category = @Translation("milken"),
 *   template = "templates/half-n-half",
 *   library = "milken/react-component",
 *   default_region = "content",
 *   icon = "images/half-n-half.png",
 *   type = "partial",
 *   regions = {
 *     "content" = {
 *       "label" = @Translation("React Coponent"),
 *     },
 *   },
 *   context_definitions = {
 *     "node" = @ContextDefinition("entity:node", label = @Translation("Node"))
 *   }
 * )
 */
class HalfNHalf extends MilkenLayoutBase {}
