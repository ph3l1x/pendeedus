<?php
/**
 * @file
 * Contains \Drupal\pd_vendor\Routing\RouteSubscriber.
 */

namespace Drupal\pd_request\Routing;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Routing\RouteSubscriberBase;
use Drupal\eck\Entity\EckEntityBundle;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    if ($route = $collection->get('eck.entity.add')) {
      $route->setDefault('_title_callback', '\Drupal\pd_request\Routing\RouteSubscriber::addDocumentPageTitle');
    }
  }

  public function addDocumentPageTitle($eck_entity_bundle) {
    /** @var EckEntityBundle $eck_entity_bundle */
    $eck_entity_bundle = EckEntityBundle::load($eck_entity_bundle);

    if ($eck_entity_bundle->getEckEntityTypeMachineName() == 'doc_request') {
      return t('Documents');
    }

    return t('Add %label content', ['%label' => $eck_entity_bundle->get('name')]);
  }

}
