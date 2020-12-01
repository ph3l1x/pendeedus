<?php

namespace Drupal\pd_request;

class DocRequestProcessBlock {

  public static function view($doc_request = NULL) {
    $output = [
      '#prefix' => '<div id="doc-request-container">',
      '#suffix' => '</div>',
    ];

    if ($doc_request) {
      $entity = \Drupal::entityTypeManager()
        ->getStorage('doc_request')
        ->load($doc_request);
      $output['view'] = self::getRenderedRequest($entity);
      $output['form'] = self::getRenderedForm($entity);
    }
    return $output;
  }

  protected static function getRenderedRequest($entity) {
    $view_builder = \Drupal::entityTypeManager()->getViewBuilder('doc_request');
    $pre_render = $view_builder->view($entity, 'process');
    return $pre_render;
  }

  protected static function getRenderedForm($entity) {
    /** @var \Drupal\Core\Entity\EntityFormBuilder $form_builder */
    $form_builder = \Drupal::service('entity.form_builder');
    $form = $form_builder->getForm($entity, 'process');
    return $form;
  }
}
