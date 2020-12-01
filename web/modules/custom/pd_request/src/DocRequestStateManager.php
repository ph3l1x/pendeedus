<?php

namespace Drupal\pd_request;

use Drupal\eck\Entity\EckEntity;
use Drupal\workflow\Entity\WorkflowTransition;

class DocRequestStateManager {

  const STATE_PENDING = 'doc_request_pending';

  const STATE_NOT_AVAILABLE = 'doc_request_not_available';

  const STATE_COMPLETED = 'doc_request_completed';

  const STATE_ADDITIONAL_FEE = 'doc_request_additional_fee';

  const STATE_ACCEPTED_FEE = 'doc_request_accepted_fee';

  const STATE_DISPUTED = 'doc_request_disputed';

  const STATE_CHARGED = 'doc_request_charged';

  /** @var EckEntity */
  protected $request;

  public function __construct(EckEntity $request) {
    $this->request = $request;
  }

  public function processUpdate() {
    if ($new_sid = $this->getNewState()) {
      $this->setState($new_sid);
    }
  }

  protected function getNewState() {
    $request = $this->request;

    // If inserted, skip.
    if (empty($request->original)) {
      return NULL;
    }

    /** @var EckEntity $original */
    $original = $request->original;

    // If is set to not available, set Not Available.
    if ($request->get('field_not_available')->getString()) {
      return self::STATE_NOT_AVAILABLE;
    }

    // If document is submitted (and was not), set to Completed.
    // If document submitted and Additionl fee is set, set to additional fee.
    if ($request->get('field_documents')->getString()
      && !$original->get('field_documents')->getString()
    ) {
      return $request->get('field_additional_fee')->getString()
        ? self::STATE_ADDITIONAL_FEE
        : self::STATE_COMPLETED;
    }

    else {
      return self::STATE_PENDING;
    }

    // TODO Add other cases here.
    return NULL;
  }

  public function setState($new_sid, $comment = '') {
    $field_name = 'field_workflow';
    $request = $this->request;

    $request->set($field_name, $new_sid);

    return;

    $current_sid = $request->get($field_name)->value;

    if ($current_sid == $new_sid) {
      return;
    }

    $transition = WorkflowTransition::create([
      $current_sid,
      'field_name' => $field_name,
    ]);
    $transition->setTargetEntity($request);
    $transition->setValues($new_sid, \Drupal::currentUser()
      ->id(), \Drupal::time()
      ->getRequestTime(), $comment, TRUE);
    $transition->force(TRUE);
  }
}
