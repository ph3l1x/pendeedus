(function ($, Drupal, drupalSettings) {

Drupal.Nodejs = Drupal.Nodejs || {
  'contentChannelNotificationCallbacks': {},
  'presenceCallbacks': {},
  'callbacks': {},
  'socket': false,
  'connectionSetupHandlers': {}
};

Drupal.behaviors.nodejs = {
  attach: function () {
    if (!Drupal.Nodejs.socket) {
      Drupal.Nodejs.connect();
    }
  }
};

Drupal.Nodejs.runCallbacks = function (message) {
  // It's possible that this message originated from an ajax request from the
  // client associated with this socket.
  if (Drupal.Nodejs.socket.sessionid && message.clientSocketId == Drupal.Nodejs.socket.sessionid) {
    return;
  }

  if (message.callback) {
    if (typeof message.callback == 'string') {
      message.callback = [message.callback];
    }
    $.each(message.callback, function () {
      var callback = this;
      if (Drupal.Nodejs.callbacks[callback] && $.isFunction(Drupal.Nodejs.callbacks[callback].callback)) {
        try {
          Drupal.Nodejs.callbacks[callback].callback(message);
        }
        catch (exception) {}
      }
    });
  }
  else if (message.presenceNotification != undefined) {
    $.each(Drupal.Nodejs.presenceCallbacks, function () {
      if ($.isFunction(this.callback)) {
        try {
          this.callback(message);
        }
        catch (exception) {}
      }
    });
  }
  else if (message.contentChannelNotification != undefined) {
    $.each(Drupal.Nodejs.contentChannelNotificationCallbacks, function () {
      if ($.isFunction(this.callback)) {
        try {
          this.callback(message);
        }
        catch (exception) {}
      }
    });
  }
  else {
    $.each(Drupal.Nodejs.callbacks, function () {
      if ($.isFunction(this.callback)) {
        try {
          this.callback(message);
        }
        catch (exception) {}
      }
    });
  }
};

Drupal.Nodejs.runSetupHandlers = function (type) {
  $.each(Drupal.Nodejs.connectionSetupHandlers, function () {
    if ($.isFunction(this[type])) {
      try {
        this[type]();
      }
      catch (exception) {}
    }
  });
};

Drupal.Nodejs.connect = function () {
  var url = drupalSettings.nodejs.client.scheme + '://' + drupalSettings.nodejs.client.host + ':' + drupalSettings.nodejs.client.port;
  drupalSettings.nodejs.connectTimeout = drupalSettings.nodejs.connectTimeout || 5000;
  if (typeof io === 'undefined') {
     return false;
  }
  Drupal.Nodejs.socket = io.connect(url, {
    timeout: drupalSettings.nodejs.connectTimeout,
    transports: drupalSettings.nodejs.client.transports,
    path: drupalSettings.nodejs.client.path,
  });
  Drupal.Nodejs.socket.on('connect', function() {
    Drupal.Nodejs.sendAuthMessage();
    Drupal.Nodejs.runSetupHandlers('connect');
    if (Drupal.ajax != undefined) {
      // Monkey-patch Drupal.ajax.prototype.beforeSerialize to auto-magically
      // send sessionId for AJAX requests so we can exclude the current browser
      // window from resulting notifications. We do this so that modules can hook
      // in to other modules ajax requests without having to patch them.
      Drupal.Nodejs.originalBeforeSerialize = Drupal.ajax.prototype.beforeSerialize;
      Drupal.ajax.prototype.beforeSerialize = function(element_settings, options) {
        options.data['nodejs_client_socket_id'] = Drupal.Nodejs.socket.socket.sessionid;
        return Drupal.Nodejs.originalBeforeSerialize(element_settings, options);
      };
    }
  });

  Drupal.Nodejs.socket.on('message', Drupal.Nodejs.runCallbacks);

  Drupal.Nodejs.socket.on('disconnect', function() {
    Drupal.Nodejs.runSetupHandlers('disconnect');
    if (Drupal.ajax != undefined) {
      Drupal.ajax.prototype.beforeSerialize = Drupal.Nodejs.originalBeforeSerialize;
    }
  });
  setTimeout("Drupal.Nodejs.checkConnection()", drupalSettings.nodejs.connectTimeout + 250);
};

Drupal.Nodejs.checkConnection = function () {
  if (!Drupal.Nodejs.socket.connected) {
    Drupal.Nodejs.runSetupHandlers('connectionFailure');
  }
};

Drupal.Nodejs.joinTokenChannel = function (channel, contentToken) {
  var joinMessage = {
    channel: channel,
    contentToken: contentToken
  };

  // Add to the global settings so that the user is joined again when the client reconnects.
  drupalSettings.nodejs.contentTokens = drupalSettings.nodejs.contentTokens || {};
  drupalSettings.nodejs.contentTokens[channel] = contentToken;

  Drupal.Nodejs.socket.emit('join-token-channel', joinMessage);
};

Drupal.Nodejs.sendAuthMessage = function () {
  var authMessage = {
    authToken: drupalSettings.nodejs.authToken,
    contentTokens: drupalSettings.nodejs.contentTokens
  };
  Drupal.Nodejs.socket.emit('authenticate', authMessage);
};

})(jQuery, Drupal, drupalSettings);

;
(function ($, Drupal, drupalSettings) {

  Drupal.Nodejs.callbacks.pdRequest = {
    callback: function (message) {
      $('.view-doc-requests, .view-user-requests').triggerHandler('RefreshView');
    }
  };

})(jQuery, Drupal, drupalSettings);
;
(function ($) {
  'use strict';
  Drupal.behaviors.pathFieldsetSummaries = {
    attach: function (context) {
      $(context).find('.path-form').drupalSetSummary(function (context) {
        var path = $('.js-form-item-path-0-alias input', context).val();
        var automatic = $('.js-form-item-path-0-pathauto input', context).prop('checked');

        if (automatic) {
          return Drupal.t('Automatic alias');
        }
        else if (path) {
          return Drupal.t('Alias: @alias', {'@alias': path});
        }
        else {
          return Drupal.t('No alias');
        }
      });
    }
  };
})(jQuery);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  var states = {
    postponed: []
  };

  Drupal.states = states;

  function invert(a, invertState) {
    return invertState && typeof a !== 'undefined' ? !a : a;
  }

  function _compare2(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }

    return typeof a === 'undefined' || typeof b === 'undefined';
  }

  function ternary(a, b) {
    if (typeof a === 'undefined') {
      return b;
    }
    if (typeof b === 'undefined') {
      return a;
    }

    return a && b;
  }

  Drupal.behaviors.states = {
    attach: function attach(context, settings) {
      var $states = $(context).find('[data-drupal-states]');
      var il = $states.length;

      var _loop = function _loop(i) {
        var config = JSON.parse($states[i].getAttribute('data-drupal-states'));
        Object.keys(config || {}).forEach(function (state) {
          new states.Dependent({
            element: $($states[i]),
            state: states.State.sanitize(state),
            constraints: config[state]
          });
        });
      };

      for (var i = 0; i < il; i++) {
        _loop(i);
      }

      while (states.postponed.length) {
        states.postponed.shift()();
      }
    }
  };

  states.Dependent = function (args) {
    var _this = this;

    $.extend(this, { values: {}, oldValue: null }, args);

    this.dependees = this.getDependees();
    Object.keys(this.dependees || {}).forEach(function (selector) {
      _this.initializeDependee(selector, _this.dependees[selector]);
    });
  };

  states.Dependent.comparisons = {
    RegExp: function RegExp(reference, value) {
      return reference.test(value);
    },
    Function: function Function(reference, value) {
      return reference(value);
    },
    Number: function Number(reference, value) {
      return typeof value === 'string' ? _compare2(reference.toString(), value) : _compare2(reference, value);
    }
  };

  states.Dependent.prototype = {
    initializeDependee: function initializeDependee(selector, dependeeStates) {
      var _this2 = this;

      this.values[selector] = {};

      Object.keys(dependeeStates).forEach(function (i) {
        var state = dependeeStates[i];

        if ($.inArray(state, dependeeStates) === -1) {
          return;
        }

        state = states.State.sanitize(state);

        _this2.values[selector][state.name] = null;

        $(selector).on('state:' + state, { selector: selector, state: state }, function (e) {
          _this2.update(e.data.selector, e.data.state, e.value);
        });

        new states.Trigger({ selector: selector, state: state });
      });
    },
    compare: function compare(reference, selector, state) {
      var value = this.values[selector][state.name];
      if (reference.constructor.name in states.Dependent.comparisons) {
        return states.Dependent.comparisons[reference.constructor.name](reference, value);
      }

      return _compare2(reference, value);
    },
    update: function update(selector, state, value) {
      if (value !== this.values[selector][state.name]) {
        this.values[selector][state.name] = value;
        this.reevaluate();
      }
    },
    reevaluate: function reevaluate() {
      var value = this.verifyConstraints(this.constraints);

      if (value !== this.oldValue) {
        this.oldValue = value;

        value = invert(value, this.state.invert);

        this.element.trigger({
          type: 'state:' + this.state,
          value: value,
          trigger: true
        });
      }
    },
    verifyConstraints: function verifyConstraints(constraints, selector) {
      var result = void 0;
      if ($.isArray(constraints)) {
        var hasXor = $.inArray('xor', constraints) === -1;
        var len = constraints.length;
        for (var i = 0; i < len; i++) {
          if (constraints[i] !== 'xor') {
            var constraint = this.checkConstraints(constraints[i], selector, i);

            if (constraint && (hasXor || result)) {
              return hasXor;
            }
            result = result || constraint;
          }
        }
      } else if ($.isPlainObject(constraints)) {
          for (var n in constraints) {
            if (constraints.hasOwnProperty(n)) {
              result = ternary(result, this.checkConstraints(constraints[n], selector, n));

              if (result === false) {
                return false;
              }
            }
          }
        }
      return result;
    },
    checkConstraints: function checkConstraints(value, selector, state) {
      if (typeof state !== 'string' || /[0-9]/.test(state[0])) {
        state = null;
      } else if (typeof selector === 'undefined') {
        selector = state;
        state = null;
      }

      if (state !== null) {
        state = states.State.sanitize(state);
        return invert(this.compare(value, selector, state), state.invert);
      }

      return this.verifyConstraints(value, selector);
    },
    getDependees: function getDependees() {
      var cache = {};

      var _compare = this.compare;
      this.compare = function (reference, selector, state) {
        (cache[selector] || (cache[selector] = [])).push(state.name);
      };

      this.verifyConstraints(this.constraints);

      this.compare = _compare;

      return cache;
    }
  };

  states.Trigger = function (args) {
    $.extend(this, args);

    if (this.state in states.Trigger.states) {
      this.element = $(this.selector);

      if (!this.element.data('trigger:' + this.state)) {
        this.initialize();
      }
    }
  };

  states.Trigger.prototype = {
    initialize: function initialize() {
      var _this3 = this;

      var trigger = states.Trigger.states[this.state];

      if (typeof trigger === 'function') {
        trigger.call(window, this.element);
      } else {
        Object.keys(trigger || {}).forEach(function (event) {
          _this3.defaultTrigger(event, trigger[event]);
        });
      }

      this.element.data('trigger:' + this.state, true);
    },
    defaultTrigger: function defaultTrigger(event, valueFn) {
      var oldValue = valueFn.call(this.element);

      this.element.on(event, $.proxy(function (e) {
        var value = valueFn.call(this.element, e);

        if (oldValue !== value) {
          this.element.trigger({
            type: 'state:' + this.state,
            value: value,
            oldValue: oldValue
          });
          oldValue = value;
        }
      }, this));

      states.postponed.push($.proxy(function () {
        this.element.trigger({
          type: 'state:' + this.state,
          value: oldValue,
          oldValue: null
        });
      }, this));
    }
  };

  states.Trigger.states = {
    empty: {
      keyup: function keyup() {
        return this.val() === '';
      }
    },

    checked: {
      change: function change() {
        var checked = false;
        this.each(function () {
          checked = $(this).prop('checked');

          return !checked;
        });
        return checked;
      }
    },

    value: {
      keyup: function keyup() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }
        return this.val();
      },
      change: function change() {
        if (this.length > 1) {
          return this.filter(':checked').val() || false;
        }
        return this.val();
      }
    },

    collapsed: {
      collapsed: function collapsed(e) {
        return typeof e !== 'undefined' && 'value' in e ? e.value : !this.is('[open]');
      }
    }
  };

  states.State = function (state) {
    this.pristine = state;
    this.name = state;

    var process = true;
    do {
      while (this.name.charAt(0) === '!') {
        this.name = this.name.substring(1);
        this.invert = !this.invert;
      }

      if (this.name in states.State.aliases) {
        this.name = states.State.aliases[this.name];
      } else {
        process = false;
      }
    } while (process);
  };

  states.State.sanitize = function (state) {
    if (state instanceof states.State) {
      return state;
    }

    return new states.State(state);
  };

  states.State.aliases = {
    enabled: '!disabled',
    invisible: '!visible',
    invalid: '!valid',
    untouched: '!touched',
    optional: '!required',
    filled: '!empty',
    unchecked: '!checked',
    irrelevant: '!relevant',
    expanded: '!collapsed',
    open: '!collapsed',
    closed: 'collapsed',
    readwrite: '!readonly'
  };

  states.State.prototype = {
    invert: false,

    toString: function toString() {
      return this.name;
    }
  };

  var $document = $(document);
  $document.on('state:disabled', function (e) {
    if (e.trigger) {
      $(e.target).prop('disabled', e.value).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value).find('select, input, textarea').prop('disabled', e.value);
    }
  });

  $document.on('state:required', function (e) {
    if (e.trigger) {
      if (e.value) {
        var label = 'label' + (e.target.id ? '[for=' + e.target.id + ']' : '');
        var $label = $(e.target).attr({ required: 'required', 'aria-required': 'true' }).closest('.js-form-item, .js-form-wrapper').find(label);

        if (!$label.hasClass('js-form-required').length) {
          $label.addClass('js-form-required form-required');
        }
      } else {
        $(e.target).removeAttr('required aria-required').closest('.js-form-item, .js-form-wrapper').find('label.js-form-required').removeClass('js-form-required form-required');
      }
    }
  });

  $document.on('state:visible', function (e) {
    if (e.trigger) {
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggle(e.value);
    }
  });

  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).prop('checked', e.value);
    }
  });

  $document.on('state:collapsed', function (e) {
    if (e.trigger) {
      if ($(e.target).is('[open]') === e.value) {
        $(e.target).find('> summary').trigger('click');
      }
    }
  });
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.fileValidateAutoAttach = {
    attach: function attach(context, settings) {
      var $context = $(context);
      var elements = void 0;

      function initFileValidation(selector) {
        $context.find(selector).once('fileValidate').on('change.fileValidate', { extensions: elements[selector] }, Drupal.file.validateExtension);
      }

      if (settings.file && settings.file.elements) {
        elements = settings.file.elements;
        Object.keys(elements).forEach(initFileValidation);
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var elements = void 0;

      function removeFileValidation(selector) {
        $context.find(selector).removeOnce('fileValidate').off('change.fileValidate', Drupal.file.validateExtension);
      }

      if (trigger === 'unload' && settings.file && settings.file.elements) {
        elements = settings.file.elements;
        Object.keys(elements).forEach(removeFileValidation);
      }
    }
  };

  Drupal.behaviors.fileAutoUpload = {
    attach: function attach(context) {
      $(context).find('input[type="file"]').once('auto-file-upload').on('change.autoFileUpload', Drupal.file.triggerUploadButton);
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        $(context).find('input[type="file"]').removeOnce('auto-file-upload').off('.autoFileUpload');
      }
    }
  };

  Drupal.behaviors.fileButtons = {
    attach: function attach(context) {
      var $context = $(context);
      $context.find('.js-form-submit').on('mousedown', Drupal.file.disableFields);
      $context.find('.js-form-managed-file .js-form-submit').on('mousedown', Drupal.file.progressBar);
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        var $context = $(context);
        $context.find('.js-form-submit').off('mousedown', Drupal.file.disableFields);
        $context.find('.js-form-managed-file .js-form-submit').off('mousedown', Drupal.file.progressBar);
      }
    }
  };

  Drupal.behaviors.filePreviewLinks = {
    attach: function attach(context) {
      $(context).find('div.js-form-managed-file .file a').on('click', Drupal.file.openInNewWindow);
    },
    detach: function detach(context) {
      $(context).find('div.js-form-managed-file .file a').off('click', Drupal.file.openInNewWindow);
    }
  };

  Drupal.file = Drupal.file || {
    validateExtension: function validateExtension(event) {
      event.preventDefault();

      $('.file-upload-js-error').remove();

      var extensionPattern = event.data.extensions.replace(/,\s*/g, '|');
      if (extensionPattern.length > 1 && this.value.length > 0) {
        var acceptableMatch = new RegExp('\\.(' + extensionPattern + ')$', 'gi');
        if (!acceptableMatch.test(this.value)) {
          var error = Drupal.t('The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.', {
            '%filename': this.value.replace('C:\\fakepath\\', ''),
            '%extensions': extensionPattern.replace(/\|/g, ', ')
          });
          $(this).closest('div.js-form-managed-file').prepend('<div class="messages messages--error file-upload-js-error" aria-live="polite">' + error + '</div>');
          this.value = '';

          event.stopImmediatePropagation();
        }
      }
    },
    triggerUploadButton: function triggerUploadButton(event) {
      $(event.target).closest('.js-form-managed-file').find('.js-form-submit[data-drupal-selector$="upload-button"]').trigger('mousedown');
    },
    disableFields: function disableFields(event) {
      var $clickedButton = $(this);
      $clickedButton.trigger('formUpdated');

      var $enabledFields = [];
      if ($clickedButton.closest('div.js-form-managed-file').length > 0) {
        $enabledFields = $clickedButton.closest('div.js-form-managed-file').find('input.js-form-file');
      }

      var $fieldsToTemporarilyDisable = $('div.js-form-managed-file input.js-form-file').not($enabledFields).not(':disabled');
      $fieldsToTemporarilyDisable.prop('disabled', true);
      setTimeout(function () {
        $fieldsToTemporarilyDisable.prop('disabled', false);
      }, 1000);
    },
    progressBar: function progressBar(event) {
      var $clickedButton = $(this);
      var $progressId = $clickedButton.closest('div.js-form-managed-file').find('input.file-progress');
      if ($progressId.length) {
        var originalName = $progressId.attr('name');

        $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);

        setTimeout(function () {
          $progressId.attr('name', originalName);
        }, 1000);
      }

      setTimeout(function () {
        $clickedButton.closest('div.js-form-managed-file').find('div.ajax-progress-bar').slideDown();
      }, 500);
      $clickedButton.trigger('fileUpload');
    },
    openInNewWindow: function openInNewWindow(event) {
      event.preventDefault();
      $(this).attr('target', '_blank');
      window.open(this.href, 'filePreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550');
    }
  };
})(jQuery, Drupal);;
/**
 * @file
 * A Backbone Model for the state of the Simple hierarchical select widget.
 *
 * @see Drupal.shs.AppView
 */

(function (Backbone, Drupal) {

  'use strict';

  /**
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.shs.AppModel = Backbone.Model.extend(/** @lends Drupal.shs.AppModel# */{

    /**
     * @type {object}
     *
     */
    defaults: /** @lends Drupal.shs.AppModel# */{

      /**
       * The field configuration.
       *
       * @type {object}
       */
      config: {}
    }

  });

}(Backbone, Drupal));
;
/**
 * @file
 * A Backbone Model for a single container of the Simple hierarchical select
 * widget.
 *
 * @see Drupal.shs.ContainerView
 */

(function (Backbone, Drupal) {

  'use strict';

  /**
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.shs.ContainerModel = Backbone.Model.extend(/** @lends Drupal.shs.ContainerModel# */{

    /**
     * @type {object}
     *
     */
    defaults: /** @lends Drupal.shs.ContainerModel# */{

      /**
       * The container delta (position).
       *
       * @type {integer}
       */
      delta: 0,

      /**
       * List of parent items.
       *
       * @type {array}
       */
      parents: [],

      /**
       * The current value within the container.
       */
      value: null

    }

  });

}(Backbone, Drupal));
;
/**
 * @file
 * A Backbone Model for a single widget in SHS.
 */

(function ($, Backbone, Drupal) {

  'use strict';


  /**
   * Backbone model for a single widget in SHS.
   *
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.shs.WidgetModel = Backbone.Model.extend(/** @lends Drupal.shs.WidgetModel# */{

    /**
     * @type {object}
     *
     * @prop {object} items
     */
    defaults: /** @lends Drupal.shs.WidgetModel# */{

      /**
       * Default value of widget.
       *
       * @type {string}
       */
      defaultValue: '_none',

      /**
       * Position of widget in app.
       *
       * @type {integer}
       */
      level: 0,

      /**
       * Collection of items in widget (options).
       *
       * @type {Drupal.shs.WidgetItemCollection}
       */
      itemCollection: null,

      /**
       * Indicator whether data for this model has been loaded already.
       *
       * @type {boolean}
       */
      dataLoaded: false
    },

    /**
     * {@inheritdoc}
     */
    initialize: function (options) {
      // Set internal id.
      this.set('id', options.id);
    }
  });

}(jQuery, Backbone, Drupal));
;
/**
 * @file
 * A Backbone Model for widget items in SHS.
 */

(function (Backbone, Drupal) {

  'use strict';


  /**
   * Backbone model for widget items in SHS.
   *
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.shs.WidgetItemModel = Backbone.Model.extend(/** @lends Drupal.shs.WidgetItemModel# */{
    /**
     * @type {object}
     *
     * @prop {integer} tid
     * @prop {string} langcode
     * @prop {string} name
     * @prop {string} description
     */
    defaults: /** @lends Drupal.shs.WidgetItemModel# */{

      /**
       * Represents the term Id.
       *
       * @type {integer}
       */
      tid: null,

      /**
       * Language code of the term.
       *
       * @type {string}
       */
      langcode: null,

      /**
       * Name (label) of the term.
       *
       * @type {string}
       */
      name: '',

      /**
       * Description of the term.
       *
       * @type {string}
       */
      description: '',

      /**
       * Indicator whether the item has children.
       *
       * @type {boolean}
       */
      hasChildren: false,

      /**
       * Attribute to use as Id.
       *
       * @type {string}
       */
      idAttribute: 'tid'
    },

    /**
     * {@inheritdoc}
     */
    initialize: function () {
      // Set internal id to termId.
      this.set('id', this.get('tid'));
    },

    /**
     * {@inheritdoc}
     */
    parse: function (response, options) {
      return {
        tid: response.tid,
        name: response.name,
        description: response.description__value,
        langcode: response.langcode,
        hasChildren: response.hasChildren
      };
    }
  });

}(Backbone, Drupal));
;
/**
 * @file
 * A Backbone Model for widget item options in SHS.
 */

(function (Backbone, Drupal) {

  'use strict';


  /**
   * Backbone model for widget item options in SHS.
   *
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.shs.WidgetItemOptionModel = Backbone.Model.extend(/** @lends Drupal.shs.WidgetItemOptionModel# */{

    /**
     * @type {object}
     *
     * @prop {string} label
     * @prop {string} value
     * @prop {boolean} hasChildren
     */
    defaults: /** @lends Drupal.shs.WidgetItemOptionModel# */{

      /**
       * Represents the option label.
       *
       * @type {string}
       */
      label: '',

      /**
       * The option value.
       *
       * @type {string}
       */
      value: undefined,

      /**
       * Indicator whether the item has children.
       *
       * @type {boolean}
       */
      hasChildren: false
    },

    /**
     * {@inheritdoc}
     */
    initialize: function () {}
  });

}(Backbone, Drupal));
;
/**
 * @file
 * A Backbone View that controls the overall Simple hierarchical select widgets.
 *
 * @see Drupal.shs.AppModel
 */

(function ($, _, Backbone, Drupal) {

  'use strict';

  Drupal.shs.AppView = Backbone.View.extend(/** @lends Drupal.shs.AppView# */{
    /**
     * Container element for SHS widgets.
     */
    container: null,
    /**
     * Field configuration.
     *
     * @type {object}
     */
    config: {},
    /**
     * @constructs
     *
     * @augments Backbone.View
     *
     * @param {object} options
     *   An object with the following keys:
     * @param {Drupal.shs.AppModel} options.model
     *   The application state model.
     */
    initialize: function (options) {
      // Track app state.
      this.config = this.model.get('config');

      // Initialize collection.
      this.collection = new Drupal.shs.ContainerCollection();
      this.collection.reset();

      // Initialize event listeners.
      this.listenTo(this.collection, 'initialize:shs', this.renderWidgets);

      this.$el.once('shs').addClass('hidden');
    },
    /**
     * Main render function of Simple hierarchical select.
     *
     * @return {Drupal.shs.AppView}
     *   Returns AppView for chaining.
     */
    render: function () {
      var app = this;

      // Create application container.
      app.container = $('<div>')
              .addClass('shs-container')
              .html('')
              .insertBefore(app.$el);

      // Generate widget containers.
      $.each(app.getConfig('parents'), function (delta, parents) {
        app.collection.add(new Drupal.shs.classes[app.getConfig('fieldName')].models.container({
          delta: delta,
          parents: parents
        }));
      });
//      $.each(app.getConfig('parents'), function (index, item) {
//        // Add WidgetModel for each parent.
//      });

      app.collection.trigger('initialize:shs');

      return app;
    },
    /**
     * Renders the select widgets of Simple hierarchical select.
     *
     * @return {Drupal.shs.AppView}
     *   Returns AppView for chaining.
     */
    renderWidgets: function () {
      var app = this;
      var fieldName = app.getConfig('fieldName');
      // Create widget containers.
      app.collection.each(function (containerModel) {
        var container = new Drupal.shs.classes[fieldName].views.container({
          app: app,
          model: containerModel
        });

        app.container.append(container.render().$el);
      });
      // Create button for "Add new".
      new Drupal.shs.classes[fieldName].views.addNew({
        app: app
      });

      app.collection.trigger('widgetsRendered:shs');
      return app;
    },
    /**
     * Update the value of the original element.
     *
     * @param {string} value
     *   New value of element.
     * @param {Drupal.shs.ContainerView} container
     *   Updated container.
     * @param {Drupal.shs.WidgetModel} widgetModel
     *   The changed model.
     */
    updateElementValue: function(value, container, widgetModel) {
      var app = this;

      if (app.getSetting('multiple')) {
        value = [];
        app.collection.each(function (model) {
          var modelValue = model.get('value');
          if (typeof modelValue == undefined || null == modelValue || modelValue === app.getSetting('anyValue')) {
            return;
          }
          value.push(modelValue);
        });
      }
      else {
        if (value === app.getSetting('anyValue') && widgetModel.get('level') > 0) {
          // Use value of parent widget (which is the id of the model ;)).
          value = widgetModel.get('id');
        }
      }
      // Set the updated value.
      app.$el.val(value).trigger({
        type: 'change',
        shsContainer: container,
        shsWidgetModel: widgetModel
      });
      return app;
    },
    /**
     * Check if original widget reports an error.
     *
     * @returns {boolean}
     *   Whether there is something wrong with the original widget.
     */
    hasError: function () {
      return this.$el.hasClass('error');
    },
    /**
     * Get a configuration value for shs.
     *
     * @param {string} name
     *   Name of the configuration to get. To get the value of a nested
     *   configuration the names are concatted by a dot (i.e.
     *   "display.animationSpeed").
     *
     * @returns {mixed}
     *   The value of the configuration or the complete configuration object if
     *   the name is empty.
     */
    getConfig: function (name) {
      if (typeof name == undefined || name == null) {
        return this.config || {};
      }

      var parts = name.split('.');
      var conf = this.config || {};
      for (var i = 0, len = parts.length; i < len; i++) {
        conf = conf[parts[i]];
      }
      if (typeof conf === undefined) {
        return;
      }
      return conf;
    },
    /**
     * Shortcut function for <code>getConfig('settings.*');</code>.
     *
     * @param {string} name
     *   Name of a setting to get. If empty, the entire settings will be
     *   returned.
     *
     * @returns {mixed}
     *   The value of the setting.
     */
    getSetting: function (name) {
      if (typeof name == undefined || name == null) {
        name = 'settings';
      }
      else {
        name = 'settings.' + name;
      }
      return this.getConfig(name);
    }
  });

  /**
   * @constructor
   *
   * @augments Backbone.Collection
   */
  Drupal.shs.ContainerCollection = Backbone.Collection.extend(/** @lends Drupal.shs.ContainerCollection */{
    /**
     * @type {Drupal.shs.ContainerModel}
     */
    model: Drupal.shs.ContainerModel
  });

}(jQuery, _, Backbone, Drupal));
;
/**
 * @file
 * A Backbone View that adds "Add new item" functionality to widget containers.
 *
 * @see Drupal.shs.ContainerView
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.shs.AddNewView = Backbone.View.extend(/** @lends Drupal.shs.AddNewView# */{
    /**
     * The main application.
     *
     * @type {Drupal.shs.AppView}
     */
    app: null,
    /**
     * Default tagname of this view.
     *
     * @type {string}
     */
    tagName: 'div',
    /**
     * @constructs
     *
     * @augments Backbone.View
     *
     * @param {object} options
     *   An object with the following keys:
     * @param {Drupal.shs.AppView} options.app
     *   The application state view.
     */
    initialize: function (options) {
      this.app = options.app;
      // Listen to collection updates.
      this.listenTo(this.app.collection, 'widgetsRendered:shs', this.addButton);
    },
    /**
     * Add button to application if needed.
     *
     * @return {Drupal.shs.AddNewView}
     *   Returns AddNewView for chaining.
     */
    addButton: function () {
      var element = this;

      // Remove buttons created earlier.
      $('.shs-addnew-container', element.app.container).remove();

      // Set default classes and clear content.
      element.$el.addClass('shs-addnew-container')
              .html('');

      // Does the setting allow us to add more items?
      var cardinality = this.app.getConfig('cardinality');
      var itemCount = this.app.collection.length;

      if ((cardinality === 1) || (cardinality === itemCount)) {
        // Only 1 item is allowed or we reached the maximum number of items.
        return;
      }

      // Create "button".
      var $button = $('<a>')
              .addClass('button')
              .addClass('add-another')
              .text(this.app.getSetting('addNewLabel'));

      $button.on('click', {app: this.app, button: this}, this.triggerContainerRefresh);
      $button.appendTo(element.$el);

      // Add element to application container.
      element.$el.appendTo(element.app.container);

      // Return self for chaining.
      return element;
    },
    /**
     * Trigger a refresh of the application container.
     *
     * @param {object} event
     *   The event object containing the following event.data:
     * @param {object} event.data.button
     *   The current view.
     * @param {object} event.data.app
     *   Reference to the main application.
     */
    triggerContainerRefresh: function (event) {
      var element = event.data.button;
      var app = event.data.app;
      element.$el.addClass('is-disabled');
      app.collection.add(new Drupal.shs.classes[app.getConfig('fieldName')].models.container({
        delta: app.collection.length,
        parents: [{
          defaultValue: app.getSetting('anyValue'),
          parent: 0
        }]
      }));
      element.$el.removeClass('is-disabled');
      app.container.html('');
      app.collection.trigger('initialize:shs');
    }
  });

}(jQuery, Backbone, Drupal));
;
/**
 * @file
 * A Backbone View that controls a Simple hierarchical select widget container.
 *
 * @see Drupal.shs.ContainerModel
 */

(function ($, _, Backbone, Drupal) {

  'use strict';

  Drupal.shs.ContainerView = Backbone.View.extend(/** @lends Drupal.shs.ContainerView# */{
    /**
     * The main application.
     *
     * @type {Drupal.shs.AppView}
     */
    app: null,
    /**
     * Default tagname of this view.
     *
     * @type {string}
     */
    tagName: 'div',
    /**
     * @constructs
     *
     * @augments Backbone.View
     *
     * @param {object} options
     *   An object with the following keys:
     * @param {Drupal.shs.AppView} options.app
     *   The application state view.
     */
    initialize: function (options) {
      this.app = options.app;

      // Set default value.
      var defaultValue = this.app.getConfig('defaultValue');
      if (null !== defaultValue && defaultValue.hasOwnProperty(this.model.get('delta'))) {
        this.model.set('value', this.app.getConfig('defaultValue')[this.model.get('delta')]);
      }

      this.collection = new Drupal.shs.WidgetCollection({
        url: Drupal.url(this.app.getConfig('baseUrl') + '/' + this.app.getConfig('fieldName') + '/' + this.app.getConfig('bundle'))
      });
      this.collection.reset();

      this.listenTo(this.collection, 'initialize:shs-container', this.renderWidgets);
      this.listenTo(this.collection, 'update:selection', this.selectionUpdate);
      this.listenTo(this.collection, 'update:value', this.broadcastUpdate);
    },
    /**
     * Main render function for a widget container.
     *
     * @return {Drupal.shs.ContainerView}
     *   Returns ContainerView for chaining.
     */
    render: function () {
      var container = this;

      // Set default classes and clear content.
      container.$el.addClass('shs-field-container')
              .attr('data-shs-delta', container.model.get('delta'))
              .html('');

      $.each(container.model.get('parents'), function (index, item) {
        // Add WidgetModel for each parent.
        container.collection.add(new Drupal.shs.classes[container.app.getConfig('fieldName')].models.widget({
          id: item.parent,
          defaultValue: item.defaultValue,
          level: index
        }));
      });

      // Trigger events.
      container.collection.trigger('initialize:shs-container');

      return container;
    },
    /**
     * Renders the select widgets of Simple hierarchical select.
     *
     * @return {Drupal.shs.ContainerView}
     *   Returns ContainerView for chaining.
     */
    renderWidgets: function () {
      var container = this;
      container.$el.html('');
      container.collection.each(function (widgetModel) {
        // Create container for widget.
        container.$el.append($('<div>').addClass('shs-widget-container').attr('data-shs-level', widgetModel.get('level')));
        // Create widget.
        new Drupal.shs.classes[container.app.getConfig('fieldName')].views.widget({
          container: container,
          model: widgetModel
        });
      });

      return container;
    },
    /**
     * Rebuild widgets based on changed selection.
     *
     * @param {Drupal.shs.WidgetModel} widgetModel
     *   The changed model.
     * @param {string} value
     *   New value of WidgetView
     * @param {Drupal.shs.WidgetView} widgetView
     *   View displaying the model.
     */
    selectionUpdate: function (widgetModel, value, widgetView) {
      var container = this;
      // Find all WidgetModels with a higher level than the changed model.
      var models = _.filter(this.collection.models, function (model) {
        return model.get('level') > widgetModel.get('level');
      });
      // Remove the found models from the collection.
      container.collection.remove(models);

      var anyValue = container.app.getSetting('anyValue');
      if (value !== anyValue) {
        // Add new model with current selection.
        container.collection.add(new Drupal.shs.classes[container.app.getConfig('fieldName')].models.widget({
          id: value,
          level: widgetModel.get('level') + 1
        }));
      }
      if (value === anyValue && widgetModel.get('level') > 0) {
        // Use value of parent widget (which is the id of the model ;)).
        value = widgetModel.get('id');
      }

      // Update parents.
      var parents = [];
      var previousParent = 0;
      container.collection.each(function (widgetModel) {
        parents.push({
          defaultValue: widgetModel.get('defaultValue'),
          parent: previousParent
        });
        previousParent = widgetModel.get('defaultValue');
      });
      container.model.set('parents', parents);
      container.model.set('value', value);
      // Trigger value update.
      container.collection.trigger('update:value', widgetModel, value);

      // Trigger rerender of widgets.
      container.collection.trigger('initialize:shs-container');
    },
    /**
     * Broadcast value update to application.
     *
     * @param {Drupal.shs.WidgetModel} widgetModel
     *   The changed model.
     * @param {string} value
     *   New value of element.
     */
    broadcastUpdate: function (widgetModel, value) {
      var app = this.app;
      if (value === app.getSetting('anyValue') && widgetModel.get('level') > 0) {
        // Use value of parent widget (which is the id of the model ;)).
        value = widgetModel.get('id');
      }
      // Send updated value to application.
      app.updateElementValue(value, this, widgetModel);
    }
  });

  /**
   * @constructor
   *
   * @augments Backbone.Collection
   */
  Drupal.shs.WidgetCollection = Backbone.Collection.extend(/** @lends Drupal.shs.WidgetCollection */{
    /**
     * @type {Drupal.shs.WidgetModel}
     */
    model: Drupal.shs.WidgetModel,
    /**
     * {@inheritdoc}
     */
    initialize: function (options) {
      this.url = options.url;
    }
  });

}(jQuery, _, Backbone, Drupal));
;
/**
 * @file
 * A Backbone view for a shs widget.
 */

(function ($, Drupal, drupalSettings, Backbone) {

  'use strict';

  Drupal.shs.WidgetView = Backbone.View.extend(/** @lends Drupal.shs.WidgetView# */{

    /**
     * The enclosing container.
     *
     * @type {Drupal.shs.ContainerView}
     */
    container: null,
    /**
     * Default tagname of this view.
     *
     * @type {string}
     */
    tagName: 'select',
    /**
     * List of custom events.
     */
    events: {
      'change': 'selectionChange'
    },
    /**
     * Backbone View for shs widgets.
     *
     * @constructs
     *
     * @augments Backbone.View
     */
    initialize: function (options) {
      this.container = options.container;

      if (!this.model.get('dataLoaded')) {
        // Create new item collection.
        this.model.itemCollection = new Drupal.shs.WidgetItemCollection({
          url: Drupal.url(this.container.app.getConfig('baseUrl') + '/' + this.container.app.getConfig('fieldName') + '/' + this.container.app.getConfig('bundle') + '/' + this.model.get('id'))
        });
      }

      this.listenTo(this, 'widget:rerender', this.render);
      this.listenTo(this.model.itemCollection, 'update', this.render);

      if (this.model.get('dataLoaded')) {
        // Re-render widget without fetching.
        this.trigger('widget:rerender');
      }
      else {
        // Fetch collection items.
        this.model.itemCollection.fetch();
      }
    },
    /**
     * @inheritdoc
     */
    render: function () {
      var widget = this;
      widget.$el.prop('id', widget.container.app.$el.prop('id') + '-shs-' + widget.container.model.get('delta') + '-' + widget.model.get('level'))
              .addClass('shs-select')
              // Add core class to apply default styles to the element.
              .addClass('form-select')
              .hide();
      if (widget.model.get('dataLoaded')) {
        widget.$el.show();
      }
      if (widget.container.app.getSetting('required')) {
        widget.$el.addClass('required');
        // Add HTML5 required attributes to first level.
        if (widget.model.get('level') === 0) {
          widget.$el.attr('required', 'required');
          widget.$el.attr('aria-required', 'true');

          // Remove attributes from original element!
          widget.container.app.$el.removeAttr('required');
          widget.container.app.$el.removeAttr('aria-required');
        }
      }
      if (widget.container.app.hasError()) {
        widget.$el.addClass('error');
      }

      // Remove all existing options.
      $('option', widget.$el).remove();

      // Add "any" option.
      widget.$el.append($('<option>').text(widget.container.app.getSetting('anyLabel')).val(widget.container.app.getSetting('anyValue')));

      // Create options from collection.
      widget.model.itemCollection.each(function (item) {
        if (!item.get('tid')) {
          return;
        }
        var optionModel = new Drupal.shs.classes[widget.container.app.getConfig('fieldName')].models.widgetItemOption({
          label: item.get('name'),
          value: item.get('tid'),
          hasChildren: item.get('hasChildren')
        });
        var option = new Drupal.shs.classes[widget.container.app.getConfig('fieldName')].views.widgetItem({
          model: optionModel
        });
        widget.$el.append(option.render().$el);
      });

      var $container = $('.shs-widget-container[data-shs-level="' + widget.model.get('level') + '"]', widget.container.$el);
      if (widget.model.itemCollection.length === 0 && !widget.container.app.getSetting('create_new_levels')) {
        // Do not create the widget.
        $container.remove();
        return widget;
      }

      // Create label if necessary.
      if ((widget.container.model.get('delta') === 0) || widget.container.app.getConfig('display.labelsOnEveryLevel')) {
        var labels = widget.container.app.getConfig('labels') || [];
        var label = false;
        if (labels.hasOwnProperty(widget.model.get('level')) && (label = labels[widget.model.get('level')]) !== false) {
          $('<label>')
                  .prop('for', widget.$el.prop('id'))
                  .text(label)
                  .appendTo($container);
        }
      }

      // Set default value of widget.
      widget.$el.val(widget.model.get('defaultValue'));

      // Add widget to container.
      if (widget.model.get('dataLoaded')) {
        // Add element without using any effect.
        $container.append(widget.$el);
      }
      else {
        $container.append(widget.$el.fadeIn(widget.container.app.getConfig('display.animationSpeed')));
      }

      widget.model.set('dataLoaded', true);
      // Return self for chaining.
      return widget;
    },
    /**
     * React to selection changes within the element.
     */
    selectionChange: function () {
      var value = $(this.el).val();
      // Update default value of attached model.
      this.model.set('defaultValue', value);
      // Fire events.
      this.container.collection.trigger('update:selection', this.model, value, this);
    }

  });

  /**
   * @constructor
   *
   * @augments Backbone.Collection
   */
  Drupal.shs.WidgetItemCollection = Backbone.Collection.extend(/** @lends Drupal.shs.WidgetItemCollection */{
    /**
     * @type {Drupal.shs.WidgetItemModel}
     */
    model: Drupal.shs.WidgetItemModel,
    /**
     * {@inheritdoc}
     */
    initialize: function (options) {
      this.url = options.url;
    }
  });

}(jQuery, Drupal, drupalSettings, Backbone));
;
/**
 * @file
 * A Backbone view for a shs widget items.
 */

(function ($, Drupal, drupalSettings, Backbone) {

  'use strict';

  Drupal.shs.WidgetItemView = Backbone.View.extend(/** @lends Drupal.shs.WidgetItemView# */{

    /**
     * Default tagname of this view.
     *
     * @type {string}
     */
    tagName: 'option',

    /**
     * Backbone View for a single shs widget item.
     *
     * @constructs
     *
     * @augments Backbone.View
     */
    initialize: function () {},

    /**
     * @inheritdoc
     */
    render: function () {
      if ((typeof this.model.get('value') === undefined) || (this.model.get('value') === null)) {
        // Do not render item.
        return;
      }

      // Set label and value of the option.
      this.$el.text(this.model.get('label'))
              .val(this.model.get('value'));

      if (this.model.get('hasChildren')) {
        // Add special class.
        this.$el.addClass('has-children');
      }

      // Return self for chaining.
      return this;
    }

  });

}(jQuery, Drupal, drupalSettings, Backbone));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, debounce) {
  var liveElement = void 0;
  var announcements = [];

  Drupal.behaviors.drupalAnnounce = {
    attach: function attach(context) {
      if (!liveElement) {
        liveElement = document.createElement('div');
        liveElement.id = 'drupal-live-announce';
        liveElement.className = 'visually-hidden';
        liveElement.setAttribute('aria-live', 'polite');
        liveElement.setAttribute('aria-busy', 'false');
        document.body.appendChild(liveElement);
      }
    }
  };

  function announce() {
    var text = [];
    var priority = 'polite';
    var announcement = void 0;

    var il = announcements.length;
    for (var i = 0; i < il; i++) {
      announcement = announcements.pop();
      text.unshift(announcement.text);

      if (announcement.priority === 'assertive') {
        priority = 'assertive';
      }
    }

    if (text.length) {
      liveElement.innerHTML = '';

      liveElement.setAttribute('aria-busy', 'true');

      liveElement.setAttribute('aria-live', priority);

      liveElement.innerHTML = text.join('\n');

      liveElement.setAttribute('aria-busy', 'false');
    }
  }

  Drupal.announce = function (text, priority) {
    announcements.push({
      text: text,
      priority: priority
    });

    return debounce(announce, 200)();
  };
})(Drupal, Drupal.debounce);;
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());
;
(function(){if(window.matchMedia&&window.matchMedia("all").addListener){return false}var e=window.matchMedia,i=e("only all").matches,n=false,t=0,a=[],r=function(i){clearTimeout(t);t=setTimeout(function(){for(var i=0,n=a.length;i<n;i++){var t=a[i].mql,r=a[i].listeners||[],o=e(t.media).matches;if(o!==t.matches){t.matches=o;for(var s=0,l=r.length;s<l;s++){r[s].call(window,t)}}}},30)};window.matchMedia=function(t){var o=e(t),s=[],l=0;o.addListener=function(e){if(!i){return}if(!n){n=true;window.addEventListener("resize",r,true)}if(l===0){l=a.push({mql:o,listeners:s})}s.push(e)};o.removeListener=function(e){for(var i=0,n=s.length;i<n;i++){if(s[i]===e){s.splice(i,1)}}};return o}})();
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var activeItem = Drupal.url(drupalSettings.path.currentPath);

  $.fn.drupalToolbarMenu = function () {
    var ui = {
      handleOpen: Drupal.t('Extend'),
      handleClose: Drupal.t('Collapse')
    };

    function toggleList($item, switcher) {
      var $toggle = $item.children('.toolbar-box').children('.toolbar-handle');
      switcher = typeof switcher !== 'undefined' ? switcher : !$item.hasClass('open');

      $item.toggleClass('open', switcher);

      $toggle.toggleClass('open', switcher);

      $toggle.find('.action').text(switcher ? ui.handleClose : ui.handleOpen);
    }

    function toggleClickHandler(event) {
      var $toggle = $(event.target);
      var $item = $toggle.closest('li');

      toggleList($item);

      var $openItems = $item.siblings().filter('.open');
      toggleList($openItems, false);
    }

    function linkClickHandler(event) {
      if (!Drupal.toolbar.models.toolbarModel.get('isFixed')) {
        Drupal.toolbar.models.toolbarModel.set('activeTab', null);
      }

      event.stopPropagation();
    }

    function initItems($menu) {
      var options = {
        class: 'toolbar-icon toolbar-handle',
        action: ui.handleOpen,
        text: ''
      };

      $menu.find('li > a').wrap('<div class="toolbar-box">');

      $menu.find('li').each(function (index, element) {
        var $item = $(element);
        if ($item.children('ul.toolbar-menu').length) {
          var $box = $item.children('.toolbar-box');
          options.text = Drupal.t('@label', {
            '@label': $box.find('a').text()
          });
          $item.children('.toolbar-box').append(Drupal.theme('toolbarMenuItemToggle', options));
        }
      });
    }

    function markListLevels($lists, level) {
      level = !level ? 1 : level;
      var $lis = $lists.children('li').addClass('level-' + level);
      $lists = $lis.children('ul');
      if ($lists.length) {
        markListLevels($lists, level + 1);
      }
    }

    function openActiveItem($menu) {
      var pathItem = $menu.find('a[href="' + window.location.pathname + '"]');
      if (pathItem.length && !activeItem) {
        activeItem = window.location.pathname;
      }
      if (activeItem) {
        var $activeItem = $menu.find('a[href="' + activeItem + '"]').addClass('menu-item--active');
        var $activeTrail = $activeItem.parentsUntil('.root', 'li').addClass('menu-item--active-trail');
        toggleList($activeTrail, true);
      }
    }

    return this.each(function (selector) {
      var $menu = $(this).once('toolbar-menu');
      if ($menu.length) {
        $menu.on('click.toolbar', '.toolbar-box', toggleClickHandler).on('click.toolbar', '.toolbar-box a', linkClickHandler);

        $menu.addClass('root');
        initItems($menu);
        markListLevels($menu);

        openActiveItem($menu);
      }
    });
  };

  Drupal.theme.toolbarMenuItemToggle = function (options) {
    return '<button class="' + options.class + '"><span class="action">' + options.action + '</span> <span class="label">' + options.text + '</span></button>';
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var options = $.extend({
    breakpoints: {
      'toolbar.narrow': '',
      'toolbar.standard': '',
      'toolbar.wide': ''
    }
  }, drupalSettings.toolbar, {
    strings: {
      horizontal: Drupal.t('Horizontal orientation'),
      vertical: Drupal.t('Vertical orientation')
    }
  });

  Drupal.behaviors.toolbar = {
    attach: function attach(context) {
      if (!window.matchMedia('only screen').matches) {
        return;
      }

      $(context).find('#toolbar-administration').once('toolbar').each(function () {
        var model = new Drupal.toolbar.ToolbarModel({
          locked: JSON.parse(localStorage.getItem('Drupal.toolbar.trayVerticalLocked')),
          activeTab: document.getElementById(JSON.parse(localStorage.getItem('Drupal.toolbar.activeTabID'))),
          height: $('#toolbar-administration').outerHeight()
        });

        Drupal.toolbar.models.toolbarModel = model;

        Object.keys(options.breakpoints).forEach(function (label) {
          var mq = options.breakpoints[label];
          var mql = window.matchMedia(mq);
          Drupal.toolbar.mql[label] = mql;

          mql.addListener(Drupal.toolbar.mediaQueryChangeHandler.bind(null, model, label));

          Drupal.toolbar.mediaQueryChangeHandler.call(null, model, label, mql);
        });

        Drupal.toolbar.views.toolbarVisualView = new Drupal.toolbar.ToolbarVisualView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.toolbarAuralView = new Drupal.toolbar.ToolbarAuralView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.bodyVisualView = new Drupal.toolbar.BodyVisualView({
          el: this,
          model: model
        });

        model.trigger('change:isFixed', model, model.get('isFixed'));
        model.trigger('change:activeTray', model, model.get('activeTray'));

        var menuModel = new Drupal.toolbar.MenuModel();
        Drupal.toolbar.models.menuModel = menuModel;
        Drupal.toolbar.views.menuVisualView = new Drupal.toolbar.MenuVisualView({
          el: $(this).find('.toolbar-menu-administration').get(0),
          model: menuModel,
          strings: options.strings
        });

        Drupal.toolbar.setSubtrees.done(function (subtrees) {
          menuModel.set('subtrees', subtrees);
          var theme = drupalSettings.ajaxPageState.theme;
          localStorage.setItem('Drupal.toolbar.subtrees.' + theme, JSON.stringify(subtrees));

          model.set('areSubtreesLoaded', true);
        });

        Drupal.toolbar.views.toolbarVisualView.loadSubtrees();

        $(document).on('drupalViewportOffsetChange.toolbar', function (event, offsets) {
          model.set('offsets', offsets);
        });

        model.on('change:orientation', function (model, orientation) {
          $(document).trigger('drupalToolbarOrientationChange', orientation);
        }).on('change:activeTab', function (model, tab) {
          $(document).trigger('drupalToolbarTabChange', tab);
        }).on('change:activeTray', function (model, tray) {
          $(document).trigger('drupalToolbarTrayChange', tray);
        });

        if (Drupal.toolbar.models.toolbarModel.get('orientation') === 'horizontal' && Drupal.toolbar.models.toolbarModel.get('activeTab') === null) {
          Drupal.toolbar.models.toolbarModel.set({
            activeTab: $('.toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a').get(0)
          });
        }

        $(window).on({
          'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
            var $toolbar = $('#toolbar-bar');
            $toolbar.css('margin-top', '0');

            if (settings.drupalOffCanvasPosition === 'top') {
              var height = Drupal.offCanvas.getContainer($element).outerHeight();
              $toolbar.css('margin-top', height + 'px');

              $element.on('dialogContentResize.off-canvas', function () {
                var newHeight = Drupal.offCanvas.getContainer($element).outerHeight();
                $toolbar.css('margin-top', newHeight + 'px');
              });
            }
          },
          'dialog:beforeclose': function dialogBeforeclose() {
            $('#toolbar-bar').css('margin-top', '0');
          }
        });
      });
    }
  };

  Drupal.toolbar = {
    views: {},

    models: {},

    mql: {},

    setSubtrees: new $.Deferred(),

    mediaQueryChangeHandler: function mediaQueryChangeHandler(model, label, mql) {
      switch (label) {
        case 'toolbar.narrow':
          model.set({
            isOriented: mql.matches,
            isTrayToggleVisible: false
          });

          if (!mql.matches || !model.get('orientation')) {
            model.set({ orientation: 'vertical' }, { validate: true });
          }
          break;

        case 'toolbar.standard':
          model.set({
            isFixed: mql.matches
          });
          break;

        case 'toolbar.wide':
          model.set({
            orientation: mql.matches && !model.get('locked') ? 'horizontal' : 'vertical'
          }, { validate: true });

          model.set({
            isTrayToggleVisible: mql.matches
          });
          break;

        default:
          break;
      }
    }
  };

  Drupal.theme.toolbarOrientationToggle = function () {
    return '<div class="toolbar-toggle-orientation"><div class="toolbar-lining">' + '<button class="toolbar-icon" type="button"></button>' + '</div></div>';
  };

  Drupal.AjaxCommands.prototype.setToolbarSubtrees = function (ajax, response, status) {
    Drupal.toolbar.setSubtrees.resolve(response.subtrees);
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.MenuModel = Backbone.Model.extend({
    defaults: {
      subtrees: {}
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarModel = Backbone.Model.extend({
    defaults: {
      activeTab: null,

      activeTray: null,

      isOriented: false,

      isFixed: false,

      areSubtreesLoaded: false,

      isViewportOverflowConstrained: false,

      orientation: 'horizontal',

      locked: false,

      isTrayToggleVisible: true,

      height: null,

      offsets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },

    validate: function validate(attributes, options) {
      if (attributes.orientation === 'horizontal' && this.get('locked') && !options.override) {
        return Drupal.t('The toolbar cannot be set to a horizontal orientation when it is locked.');
      }
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  Drupal.toolbar.BodyVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:activeTray ', this.render);
      this.listenTo(this.model, 'change:isFixed change:isViewportOverflowConstrained', this.isToolbarFixed);
    },
    isToolbarFixed: function isToolbarFixed() {
      var isViewportOverflowConstrained = this.model.get('isViewportOverflowConstrained');
      $('body').toggleClass('toolbar-fixed', isViewportOverflowConstrained || this.model.get('isFixed'));
    },
    render: function render() {
      $('body').toggleClass('toolbar-tray-open', !!this.model.get('activeTray'));
    }
  });
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Backbone, Drupal) {
  Drupal.toolbar.MenuVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:subtrees', this.render);
    },
    render: function render() {
      var _this = this;

      var subtrees = this.model.get('subtrees');

      Object.keys(subtrees || {}).forEach(function (id) {
        _this.$el.find('#toolbar-link-' + id).once('toolbar-subtrees').after(subtrees[id]);
      });

      if ('drupalToolbarMenu' in $.fn) {
        this.$el.children('.toolbar-menu').drupalToolbarMenu();
      }
    }
  });
})(jQuery, Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarAuralView = Backbone.View.extend({
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:orientation', this.onOrientationChange);
      this.listenTo(this.model, 'change:activeTray', this.onActiveTrayChange);
    },
    onOrientationChange: function onOrientationChange(model, orientation) {
      Drupal.announce(Drupal.t('Tray orientation changed to @orientation.', {
        '@orientation': orientation
      }));
    },
    onActiveTrayChange: function onActiveTrayChange(model, tray) {
      var relevantTray = tray === null ? model.previous('activeTray') : tray;

      if (!relevantTray) {
        return;
      }
      var action = tray === null ? Drupal.t('closed') : Drupal.t('opened');
      var trayNameElement = relevantTray.querySelector('.toolbar-tray-name');
      var text = void 0;
      if (trayNameElement !== null) {
        text = Drupal.t('Tray "@tray" @action.', {
          '@tray': trayNameElement.textContent,
          '@action': action
        });
      } else {
        text = Drupal.t('Tray @action.', { '@action': action });
      }
      Drupal.announce(text);
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, Backbone) {
  Drupal.toolbar.ToolbarVisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        'click .toolbar-bar .toolbar-tab .trigger': 'onTabClick',
        'click .toolbar-toggle-orientation button': 'onOrientationToggleClick',
        'touchend .toolbar-bar .toolbar-tab .trigger': touchEndToClick,
        'touchend .toolbar-toggle-orientation button': touchEndToClick
      };
    },
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented change:isTrayToggleVisible', this.render);
      this.listenTo(this.model, 'change:mqMatches', this.onMediaQueryChange);
      this.listenTo(this.model, 'change:offsets', this.adjustPlacement);
      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented', this.updateToolbarHeight);

      this.$el.find('.toolbar-tray .toolbar-lining').append(Drupal.theme('toolbarOrientationToggle'));

      this.model.trigger('change:activeTab');
    },
    updateToolbarHeight: function updateToolbarHeight() {
      var toolbarTabOuterHeight = $('#toolbar-bar').find('.toolbar-tab').outerHeight() || 0;
      var toolbarTrayHorizontalOuterHeight = $('.is-active.toolbar-tray-horizontal').outerHeight() || 0;
      this.model.set('height', toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight);

      $('body').css({
        'padding-top': this.model.get('height')
      });

      this.triggerDisplace();
    },
    triggerDisplace: function triggerDisplace() {
      _.defer(function () {
        Drupal.displace(true);
      });
    },
    render: function render() {
      this.updateTabs();
      this.updateTrayOrientation();
      this.updateBarAttributes();

      $('body').removeClass('toolbar-loading');

      if (this.model.changed.orientation === 'vertical' || this.model.changed.activeTab) {
        this.loadSubtrees();
      }

      return this;
    },
    onTabClick: function onTabClick(event) {
      if (event.currentTarget.hasAttribute('data-toolbar-tray')) {
        var activeTab = this.model.get('activeTab');
        var clickedTab = event.currentTarget;

        this.model.set('activeTab', !activeTab || clickedTab !== activeTab ? clickedTab : null);

        event.preventDefault();
        event.stopPropagation();
      }
    },
    onOrientationToggleClick: function onOrientationToggleClick(event) {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
      var locked = antiOrientation === 'vertical';

      if (locked) {
        localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
      } else {
        localStorage.removeItem('Drupal.toolbar.trayVerticalLocked');
      }

      this.model.set({
        locked: locked,
        orientation: antiOrientation
      }, {
        validate: true,
        override: true
      });

      event.preventDefault();
      event.stopPropagation();
    },
    updateTabs: function updateTabs() {
      var $tab = $(this.model.get('activeTab'));

      $(this.model.previous('activeTab')).removeClass('is-active').prop('aria-pressed', false);

      $(this.model.previous('activeTray')).removeClass('is-active');

      if ($tab.length > 0) {
        $tab.addClass('is-active').prop('aria-pressed', true);
        var name = $tab.attr('data-toolbar-tray');

        var id = $tab.get(0).id;
        if (id) {
          localStorage.setItem('Drupal.toolbar.activeTabID', JSON.stringify(id));
        }

        var $tray = this.$el.find('[data-toolbar-tray="' + name + '"].toolbar-tray');
        if ($tray.length) {
          $tray.addClass('is-active');
          this.model.set('activeTray', $tray.get(0));
        } else {
          this.model.set('activeTray', null);
        }
      } else {
        this.model.set('activeTray', null);
        localStorage.removeItem('Drupal.toolbar.activeTabID');
      }
    },
    updateBarAttributes: function updateBarAttributes() {
      var isOriented = this.model.get('isOriented');
      if (isOriented) {
        this.$el.find('.toolbar-bar').attr('data-offset-top', '');
      } else {
        this.$el.find('.toolbar-bar').removeAttr('data-offset-top');
      }

      this.$el.toggleClass('toolbar-oriented', isOriented);
    },
    updateTrayOrientation: function updateTrayOrientation() {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';

      $('body').toggleClass('toolbar-vertical', orientation === 'vertical').toggleClass('toolbar-horizontal', orientation === 'horizontal');

      var removeClass = antiOrientation === 'horizontal' ? 'toolbar-tray-horizontal' : 'toolbar-tray-vertical';
      var $trays = this.$el.find('.toolbar-tray').removeClass(removeClass).addClass('toolbar-tray-' + orientation);

      var iconClass = 'toolbar-icon-toggle-' + orientation;
      var iconAntiClass = 'toolbar-icon-toggle-' + antiOrientation;
      var $orientationToggle = this.$el.find('.toolbar-toggle-orientation').toggle(this.model.get('isTrayToggleVisible'));
      $orientationToggle.find('button').val(antiOrientation).attr('title', this.strings[antiOrientation]).text(this.strings[antiOrientation]).removeClass(iconClass).addClass(iconAntiClass);

      var dir = document.documentElement.dir;
      var edge = dir === 'rtl' ? 'right' : 'left';

      $trays.removeAttr('data-offset-left data-offset-right data-offset-top');

      $trays.filter('.toolbar-tray-vertical.is-active').attr('data-offset-' + edge, '');

      $trays.filter('.toolbar-tray-horizontal.is-active').attr('data-offset-top', '');
    },
    adjustPlacement: function adjustPlacement() {
      var $trays = this.$el.find('.toolbar-tray');
      if (!this.model.get('isOriented')) {
        $trays.removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
      }
    },
    loadSubtrees: function loadSubtrees() {
      var $activeTab = $(this.model.get('activeTab'));
      var orientation = this.model.get('orientation');

      if (!this.model.get('areSubtreesLoaded') && typeof $activeTab.data('drupal-subtrees') !== 'undefined' && orientation === 'vertical') {
        var subtreesHash = drupalSettings.toolbar.subtreesHash;
        var theme = drupalSettings.ajaxPageState.theme;
        var endpoint = Drupal.url('toolbar/subtrees/' + subtreesHash);
        var cachedSubtreesHash = localStorage.getItem('Drupal.toolbar.subtreesHash.' + theme);
        var cachedSubtrees = JSON.parse(localStorage.getItem('Drupal.toolbar.subtrees.' + theme));
        var isVertical = this.model.get('orientation') === 'vertical';

        if (isVertical && subtreesHash === cachedSubtreesHash && cachedSubtrees) {
          Drupal.toolbar.setSubtrees.resolve(cachedSubtrees);
        } else if (isVertical) {
            localStorage.removeItem('Drupal.toolbar.subtreesHash.' + theme);
            localStorage.removeItem('Drupal.toolbar.subtrees.' + theme);

            Drupal.ajax({ url: endpoint }).execute();

            localStorage.setItem('Drupal.toolbar.subtreesHash.' + theme, subtreesHash);
          }
      }
    }
  });
})(jQuery, Drupal, drupalSettings, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  function TabbingManager() {
    this.stack = [];
  }

  function TabbingContext(options) {
    $.extend(this, {
      level: null,

      $tabbableElements: $(),

      $disabledElements: $(),

      released: false,

      active: false
    }, options);
  }

  $.extend(TabbingManager.prototype, {
    constrain: function constrain(elements) {
      var il = this.stack.length;
      for (var i = 0; i < il; i++) {
        this.stack[i].deactivate();
      }

      var $elements = $(elements).find(':tabbable').addBack(':tabbable');

      var tabbingContext = new TabbingContext({
        level: this.stack.length,
        $tabbableElements: $elements
      });

      this.stack.push(tabbingContext);

      tabbingContext.activate();

      $(document).trigger('drupalTabbingConstrained', tabbingContext);

      return tabbingContext;
    },
    release: function release() {
      var toActivate = this.stack.length - 1;
      while (toActivate >= 0 && this.stack[toActivate].released) {
        toActivate--;
      }

      this.stack.splice(toActivate + 1);

      if (toActivate >= 0) {
        this.stack[toActivate].activate();
      }
    },
    activate: function activate(tabbingContext) {
      var $set = tabbingContext.$tabbableElements;
      var level = tabbingContext.level;

      var $disabledSet = $(':tabbable').not($set);

      tabbingContext.$disabledElements = $disabledSet;

      var il = $disabledSet.length;
      for (var i = 0; i < il; i++) {
        this.recordTabindex($disabledSet.eq(i), level);
      }

      $disabledSet.prop('tabindex', -1).prop('autofocus', false);

      var $hasFocus = $set.filter('[autofocus]').eq(-1);

      if ($hasFocus.length === 0) {
        $hasFocus = $set.eq(0);
      }
      $hasFocus.trigger('focus');
    },
    deactivate: function deactivate(tabbingContext) {
      var $set = tabbingContext.$disabledElements;
      var level = tabbingContext.level;
      var il = $set.length;
      for (var i = 0; i < il; i++) {
        this.restoreTabindex($set.eq(i), level);
      }
    },
    recordTabindex: function recordTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices') || {};
      tabInfo[level] = {
        tabindex: $el[0].getAttribute('tabindex'),
        autofocus: $el[0].hasAttribute('autofocus')
      };
      $el.data('drupalOriginalTabIndices', tabInfo);
    },
    restoreTabindex: function restoreTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices');
      if (tabInfo && tabInfo[level]) {
        var data = tabInfo[level];
        if (data.tabindex) {
          $el[0].setAttribute('tabindex', data.tabindex);
        } else {
            $el[0].removeAttribute('tabindex');
          }
        if (data.autofocus) {
          $el[0].setAttribute('autofocus', 'autofocus');
        }

        if (level === 0) {
          $el.removeData('drupalOriginalTabIndices');
        } else {
          var levelToDelete = level;
          while (tabInfo.hasOwnProperty(levelToDelete)) {
            delete tabInfo[levelToDelete];
            levelToDelete++;
          }
          $el.data('drupalOriginalTabIndices', tabInfo);
        }
      }
    }
  });

  $.extend(TabbingContext.prototype, {
    release: function release() {
      if (!this.released) {
        this.deactivate();
        this.released = true;
        Drupal.tabbingManager.release(this);

        $(document).trigger('drupalTabbingContextReleased', this);
      }
    },
    activate: function activate() {
      if (!this.active && !this.released) {
        this.active = true;
        Drupal.tabbingManager.activate(this);

        $(document).trigger('drupalTabbingContextActivated', this);
      }
    },
    deactivate: function deactivate() {
      if (this.active) {
        this.active = false;
        Drupal.tabbingManager.deactivate(this);

        $(document).trigger('drupalTabbingContextDeactivated', this);
      }
    }
  });

  if (Drupal.tabbingManager) {
    return;
  }

  Drupal.tabbingManager = new TabbingManager();
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  var strings = {
    tabbingReleased: Drupal.t('Tabbing is no longer constrained by the Contextual module.'),
    tabbingConstrained: Drupal.t('Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.'),
    pressEsc: Drupal.t('Press the esc key to exit.')
  };

  function initContextualToolbar(context) {
    if (!Drupal.contextual || !Drupal.contextual.collection) {
      return;
    }

    var contextualToolbar = Drupal.contextualToolbar;
    contextualToolbar.model = new contextualToolbar.StateModel({
      isViewing: localStorage.getItem('Drupal.contextualToolbar.isViewing') !== 'false'
    }, {
      contextualCollection: Drupal.contextual.collection
    });

    var viewOptions = {
      el: $('.toolbar .toolbar-bar .contextual-toolbar-tab'),
      model: contextualToolbar.model,
      strings: strings
    };
    new contextualToolbar.VisualView(viewOptions);
    new contextualToolbar.AuralView(viewOptions);
  }

  Drupal.behaviors.contextualToolbar = {
    attach: function attach(context) {
      if ($('body').once('contextualToolbar-init').length) {
        initContextualToolbar(context);
      }
    }
  };

  Drupal.contextualToolbar = {
    model: null
  };
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.StateModel = Backbone.Model.extend({
    defaults: {
      isViewing: true,

      isVisible: false,

      contextualCount: 0,

      tabbingContext: null
    },

    initialize: function initialize(attrs, options) {
      this.listenTo(options.contextualCollection, 'reset remove add', this.countContextualLinks);
      this.listenTo(options.contextualCollection, 'add', this.lockNewContextualLinks);

      this.listenTo(this, 'change:contextualCount', this.updateVisibility);

      this.listenTo(this, 'change:isViewing', function (model, isViewing) {
        options.contextualCollection.each(function (contextualModel) {
          contextualModel.set('isLocked', !isViewing);
        });
      });
    },
    countContextualLinks: function countContextualLinks(contextualModel, contextualCollection) {
      this.set('contextualCount', contextualCollection.length);
    },
    lockNewContextualLinks: function lockNewContextualLinks(contextualModel, contextualCollection) {
      if (!this.get('isViewing')) {
        contextualModel.set('isLocked', true);
      }
    },
    updateVisibility: function updateVisibility() {
      this.set('isVisible', this.get('contextualCount') > 0);
    }
  });
})(Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone, _) {
  Drupal.contextualToolbar.AuralView = Backbone.View.extend({
    announcedOnce: false,

    initialize: function initialize(options) {
      this.options = options;

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.manageTabbing);

      $(document).on('keyup', _.bind(this.onKeypress, this));
      this.manageTabbing();
    },
    render: function render() {
      this.$el.find('button').attr('aria-pressed', !this.model.get('isViewing'));

      return this;
    },
    manageTabbing: function manageTabbing() {
      var tabbingContext = this.model.get('tabbingContext');

      if (tabbingContext) {
        if (tabbingContext.active) {
          Drupal.announce(this.options.strings.tabbingReleased);
        }
        tabbingContext.release();
      }

      if (!this.model.get('isViewing')) {
        tabbingContext = Drupal.tabbingManager.constrain($('.contextual-toolbar-tab, .contextual'));
        this.model.set('tabbingContext', tabbingContext);
        this.announceTabbingConstraint();
        this.announcedOnce = true;
      }
    },
    announceTabbingConstraint: function announceTabbingConstraint() {
      var strings = this.options.strings;
      Drupal.announce(Drupal.formatString(strings.tabbingConstrained, {
        '@contextualsCount': Drupal.formatPlural(Drupal.contextual.collection.length, '@count contextual link', '@count contextual links')
      }));
      Drupal.announce(strings.pressEsc);
    },
    onKeypress: function onKeypress(event) {
      if (!this.announcedOnce && event.keyCode === 9 && !this.model.get('isViewing')) {
        this.announceTabbingConstraint();

        this.announcedOnce = true;
      }

      if (event.keyCode === 27) {
        this.model.set('isViewing', true);
      }
    }
  });
})(jQuery, Drupal, Backbone, _);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.VisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        click: function click() {
          this.model.set('isViewing', !this.model.get('isViewing'));
        },

        touchend: touchEndToClick
      };
    },
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.persist);
    },
    render: function render() {
      this.$el.toggleClass('hidden', !this.model.get('isVisible'));

      this.$el.find('button').toggleClass('is-active', !this.model.get('isViewing'));

      return this;
    },
    persist: function persist(model, isViewing) {
      if (!isViewing) {
        localStorage.setItem('Drupal.contextualToolbar.isViewing', 'false');
      } else {
        localStorage.removeItem('Drupal.contextualToolbar.isViewing');
      }
    }
  });
})(Drupal, Backbone);;
;/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (jQuery && !jQuery.fn.hoverIntent) {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  // default configuration values
  var _cfg = {
    interval: 100,
    sensitivity: 6,
    timeout: 0
  };

  // counter used to generate an ID for each instance
  var INSTANCE_COUNT = 0;

  // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
  var cX, cY;

  // saves the current pointer position coordinates based on the given mousemove event
  var track = function (ev) {
    cX = ev.pageX;
    cY = ev.pageY;
  };

  // compares current and previous mouse positions
  var compare = function (ev,$el,s,cfg) {
    // compare mouse positions to see if pointer has slowed enough to trigger `over` function
    if ( Math.sqrt( (s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY) ) < cfg.sensitivity ) {
      $el.off(s.event,track);
      delete s.timeoutId;
      // set hoverIntent state as active for this element (permits `out` handler to trigger)
      s.isActive = true;
      // overwrite old mouseenter event coordinates with most recent pointer position
      ev.pageX = cX; ev.pageY = cY;
      // clear coordinate data from state object
      delete s.pX; delete s.pY;
      return cfg.over.apply($el[0],[ev]);
    } else {
      // set previous coordinates for next comparison
      s.pX = cX; s.pY = cY;
      // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
      s.timeoutId = setTimeout( function () {compare(ev, $el, s, cfg);} , cfg.interval );
    }
  };

  // triggers given `out` function at configured `timeout` after a mouseleave and clears state
  var delay = function (ev,$el,s,out) {
    delete $el.data('hoverIntent')[s.id];
    return out.apply($el[0],[ev]);
  };

  $.fn.hoverIntent = function (handlerIn,handlerOut,selector) {
    // instance ID, used as a key to store and retrieve state information on an element
    var instanceId = INSTANCE_COUNT++;

    // extend the default configuration and parse parameters
    var cfg = $.extend({}, _cfg);
    if ( $.isPlainObject(handlerIn) ) {
      cfg = $.extend(cfg, handlerIn);
      if ( !$.isFunction(cfg.out) ) {
        cfg.out = cfg.over;
      }
    } else if ( $.isFunction(handlerOut) ) {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
    } else {
      cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
    }

    // A private function for handling mouse 'hovering'
    var handleHover = function (e) {
      // cloned event to pass to handlers (copy required for event object to be passed in IE)
      var ev = $.extend({},e);

      // the current target of the mouse event, wrapped in a jQuery object
      var $el = $(this);

      // read hoverIntent data from element (or initialize if not present)
      var hoverIntentData = $el.data('hoverIntent');
      if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

      // read per-instance state from element (or initialize if not present)
      var state = hoverIntentData[instanceId];
      if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

      // state properties:
      // id = instance ID, used to clean up data
      // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
      // isActive = plugin state, true after `over` is called just until `out` is called
      // pX, pY = previously-measured pointer coordinates, updated at each polling interval
      // event = string representing the namespaced event used for mouse tracking

      // clear any existing timeout
      if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

      // namespaced event used to register and unregister mousemove tracking
      var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent' + instanceId;

      // handle the event, based on its type
      if (e.type === 'mouseenter') {
        // do nothing if already active
        if (state.isActive) { return; }
        // set "previous" X and Y position based on initial entry point
        state.pX = ev.pageX; state.pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $el.off(mousemove,track).on(mousemove,track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        state.timeoutId = setTimeout( function () {compare(ev,$el,state,cfg);} , cfg.interval );
      } else { // "mouseleave"
        // do nothing if not already active
        if (!state.isActive) { return; }
        // unbind expensive mousemove event
        $el.off(mousemove,track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        state.timeoutId = setTimeout( function () {delay(ev,$el,state,cfg.out);} , cfg.timeout );
      }
    };

    // listen for mouseenter and mouseleave
    return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
  };
});
;
(function ($, Drupal) {
  Drupal.behaviors.adminToolbar = {
    attach: function (context, settings) {

      $('a.toolbar-icon', context).removeAttr('title');

      $('.toolbar-tray li.menu-item--expanded, .toolbar-tray ul li.menu-item--expanded .menu-item', context).hoverIntent({
        over: function () {
          // At the current depth, we should delete all "hover-intent" classes.
          // Other wise we get unwanted behaviour where menu items are expanded while already in hovering other ones.
          $(this).parent().find('li').removeClass('hover-intent');
          $(this).addClass('hover-intent');
        },
        out: function () {
          $(this).removeClass('hover-intent');
        },
        timeout: 250
      });

      // Make the toolbar menu navigable with keyboard.
      $('ul.toolbar-menu li.menu-item--expanded a', context).on('focusin', function () {
        $('li.menu-item--expanded', context).removeClass('hover-intent');
        $(this).parents('li.menu-item--expanded').addClass('hover-intent');
      });

      $('ul.toolbar-menu li.menu-item a', context).keydown(function (e) {
        if ((e.shiftKey && (e.keyCode || e.which) == 9)) {
          if ($(this).parent('.menu-item').prev().hasClass('menu-item--expanded')) {
            $(this).parent('.menu-item').prev().addClass('hover-intent');
          }
        }
      });

      $('.toolbar-menu:first-child > .menu-item:not(.menu-item--expanded) a, .toolbar-tab > a', context).on('focusin', function () {
        $('.menu-item--expanded').removeClass('hover-intent');
      });

      $('.toolbar-menu:first-child > .menu-item', context).on('hover', function () {
        $(this, 'a').css("background: #fff;");
      });

      $('ul:not(.toolbar-menu)', context).on({
        mousemove: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        },
        hover: function () {
          $('li.menu-item--expanded').removeClass('hover-intent');
        }
      });

      // Always hide the dropdown menu on mobile.
      if ($('body:not(.toolbar-fixed) #toolbar-item-administration-tray').hasClass('toolbar-tray-vertical')) {
        $('#toolbar-item-administration').removeClass('is-active');
        $('#toolbar-item-administration-tray').removeClass('is-active');
      };

    }
  };
})(jQuery, Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var pathInfo = drupalSettings.path;
  var escapeAdminPath = sessionStorage.getItem('escapeAdminPath');
  var windowLocation = window.location;

  if (!pathInfo.currentPathIsAdmin && !/destination=/.test(windowLocation.search)) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  Drupal.behaviors.escapeAdmin = {
    attach: function attach() {
      var $toolbarEscape = $('[data-toolbar-escape-admin]').once('escapeAdmin');
      if ($toolbarEscape.length && pathInfo.currentPathIsAdmin) {
        if (escapeAdminPath !== null) {
          $toolbarEscape.attr('href', escapeAdminPath);
        } else {
          $toolbarEscape.text(Drupal.t('Home'));
        }
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos !== -1) {
      query = query.substring(pos + 1);
    }
    var pair = void 0;
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split('=');

      if (pair[0] !== 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);

    var viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);

    if (viewHref && path.substring(0, viewHref.length + 1) === viewHref + '/') {
      returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
      returnObj.view_path = path;
    }
    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;

      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };
  Drupal.behaviors.ViewsAjaxView.detach = function (context, settings, trigger) {
    if (trigger === 'unload') {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;

        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = '.js-view-dom-id-' + ajaxViews[i].view_dom_id;
          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};

  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = '.js-view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf('Array') !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || '';
    if (queryString !== '') {
      queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        queryString = (/\?/.test(ajaxPath) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: { type: 'fullscreen' }
    };

    this.settings = settings;

    this.$exposed_form = $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once('exposed-form').each($.proxy(this.attachExposedFormAjax, this));

    this.$view.filter($.proxy(this.filterNestedViews, this)).once('ajax-pager').each($.proxy(this.attachPagerAjax, this));

    var selfSettings = $.extend({}, this.element_settings, {
      event: 'RefreshView',
      base: this.selector,
      element: this.$view.get(0)
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];

    $('input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var selfSettings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
    });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents('.view').length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');

    $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();

    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 * Extends core ajax_view.js.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * @method
   */
  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];
    $('button[type=submit], input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var self_settings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(self_settings);
    });
  };

})(jQuery, Drupal);
;
