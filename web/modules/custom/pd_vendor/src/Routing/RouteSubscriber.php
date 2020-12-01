<?php
/**
 * @file
 * Contains \Drupal\pd_vendor\Routing\RouteSubscriber.
 */

namespace Drupal\pd_vendor\Routing;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    if ($route = $collection->get('multiple_registration.role_registration_page')) {
      $route->setDefault('_title_callback', '\Drupal\pd_vendor\Routing\RouteSubscriber::userRegisterTitle');
    }
  }

  public function userRegisterTitle(RouteMatchInterface $route) {
    return t('Register');
  }

}
