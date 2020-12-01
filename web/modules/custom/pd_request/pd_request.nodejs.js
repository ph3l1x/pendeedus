(function ($, Drupal, drupalSettings) {

  Drupal.Nodejs.callbacks.pdRequest = {
    callback: function (message) {
      $('.view-doc-requests, .view-user-requests').triggerHandler('RefreshView');
    }
  };

})(jQuery, Drupal, drupalSettings);
