<?php

namespace Drupal\milken_base\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Entity\FieldableEntityInterface;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem;
use Drupal\Core\Field\Plugin\Field\FieldWidget\OptionsButtonsWidget;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'options_buttons' widget.
 *
 * @FieldWidget(
 *   id = "milken_layouts_selection_icons",
 *   label = @Translation("Selection Icons For Milken Layouts"),
 *   field_types = {
 *     "entity_reference",
 *   },
 *   multiple_values = FALSE
 * )
 */
class MilkenLayoutSelectionIcons extends OptionsButtonsWidget {

  /**
   * Derive a list of options from layout.
   *
   * @param \Drupal\Core\Entity\FieldableEntityInterface $entity
   *   Base entity.
   *
   * @return array|null[]|string[]
   *   Returns array of options.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  protected function getOptions(FieldableEntityInterface $entity) {
    if (!isset($this->options)) {
      $options = [];
      // Limit the settable options for the current user account.
      $op = $this->fieldDefinition
        ->getFieldStorageDefinition()
        ->getOptionsProvider($this->column, $entity);

      if ($op instanceof EntityReferenceItem) {
        $fieldDef = $op->getFieldDefinition();
        $targetType = $fieldDef->getFieldStorageDefinition()
          ->getSetting('target_type');
        $selectionHandler = \Drupal::service('plugin.manager.entity_reference_selection')
          ->getSelectionHandler($fieldDef, $op->getEntity());
        $refs = $selectionHandler->getReferenceableEntities();
        $path = drupal_get_path('module', 'milken_base') . "/images";
        if (is_array($refs[$targetType])) {
          $result = \Drupal::entityTypeManager()
            ->getStorage($targetType)
            ->loadMultiple(array_keys($refs[$targetType]));
          if (empty($result)) {
            return [];
          }
          foreach ($result as $layout) {
            $imageURL = base_path() . $path . "/" . str_replace("_", "-", $layout->id()) . ".png";
            $options[$layout->id()] = '<img src="' . $imageURL . '" alt="' . $layout->label() . '" />';
          }
        }

      }
      $this->options = $options;
    }
    return $this->options;
  }

  /**
   * Get selected Options.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $items
   *   Item list.
   *
   * @return array|null
   *   Returns null.
   *
   * @throws \Drupal\Core\TypedData\Exception\MissingDataException
   */
  protected function getSelectedOptions(FieldItemListInterface $items) {
    $value = $items->get(0)->getValue();
    if (is_array($value) && isset($value[$this->column])) {
      return [$value[$this->column]];
    }
    return NULL;
  }

  /**
   * Massage form values.
   *
   * @param array $values
   *   Values to massage.
   * @param array $form
   *   Form from which they are derived.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form State object.
   *
   * @return array|mixed|null
   *   Returns array of Items.
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    $field_name = $this->fieldDefinition->getName();

    // Extract the values from $form_state->getValues().
    $path = array_merge($form['#parents'], [$field_name]);
    $key_exists = NULL;
    $values = NestedArray::getValue($form_state->getValues(), $path, $key_exists);
    while (is_array($values) && !empty($values) && !isset($values['target_id'])) {
      $values = array_shift($values);
    }
    return $values;
  }

}
