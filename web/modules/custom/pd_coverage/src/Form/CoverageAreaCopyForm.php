<?php

namespace Drupal\pd_coverage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class CoverageAreaSelectorForm.
 */
class CoverageAreaCopyForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'coverage_area_copy_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $entity = NULL, $op = NULL) {
    $form['area_coverage'] = [
      '#type' => 'container',
    ];

    $form['area_coverage']['entity'] = [
      '#type' => 'inline_entity_form',
      '#entity_type' => 'area_coverage',
      '#bundle' => 'area_coverage',
      // If the #default_value is NULL, a new entity will be created.
      '#default_value' => $entity,
      '#op' => $op,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => t('Save'),
    ];

    // ElementSubmit::attach($form, $form_state);
    $form['#submit'][] = [
      'Drupal\\inline_entity_form\\ElementSubmit',
      'trigger',
    ];

    $form['#ief_element_submit'][] = ['Drupal\\inline_entity_form\\WidgetSubmit', 'doSubmit'];

    return $form;
  }


  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
