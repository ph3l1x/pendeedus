<?php

namespace Drupal\pd_request\Plugin\Block;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\pd_request\DocRequestProcessBlock;

/**
 * Provides a 'Doc Request container' block.
 *
 * @Block(
 *   id = "pd_request_container",
 *   admin_label = @Translation("Doc Request container"),
 *   category = @Translation("Pendeedus")
 * )
 */
class DocRequestProcessContainer extends BlockBase {

  /**
   * {@inheritdoc}
   */
  protected function blockAccess(AccountInterface $account) {
    return AccessResult::allowed();
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $doc_request = \Drupal::request()->query->get('doc_request');
    $build = DocRequestProcessBlock::view($doc_request);

    $build['#cache']['max-age'] = 0;
    $build['#cache']['contexts'] = [];
    $build['#cache']['tags'] = [];

    return $build;
  }
}
