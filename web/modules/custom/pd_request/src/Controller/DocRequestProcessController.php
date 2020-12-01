<?php

namespace Drupal\pd_request\Controller;

use Drupal\Core\Ajax\AjaxResponse;

use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\pd_request\DocRequestProcessBlock;

class DocRequestProcessController extends ControllerBase {

  public function view($doc_request) {

    # New response
    $response = new AjaxResponse();

    $output = DocRequestProcessBlock::view($doc_request);

    // Render the form using the renderer service, with the renderRoot method
    $rendered = \Drupal::service('renderer')->renderRoot($output);

    // Add any attachments for the form to the response
    $response->addAttachments($output['#attached']);

    # Commands Ajax
    $response->addCommand(new ReplaceCommand('#doc-request-container', $rendered));

    # Return response
    return $response;

  }

}
