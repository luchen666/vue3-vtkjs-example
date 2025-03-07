import { c as createInlineWorkerFactory } from '../../../../rollup-plugin-web-worker-loader__helper__browser__createInlineWorkerFactory.js';

var WorkerFactory = createInlineWorkerFactory(/* rollup-plugin-web-worker-loader */function () {
(function () {
  '__worker_loader_strict__';

  var register = {exports: {}};

  var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var TinyEmitter$1 = function () {
    function TinyEmitter() {
      _classCallCheck$1(this, TinyEmitter);

      Object.defineProperty(this, '__listeners', {
        value: {},
        enumerable: false,
        writable: false
      });
    }

    _createClass$1(TinyEmitter, [{
      key: 'emit',
      value: function emit(eventName) {
        if (!this.__listeners[eventName]) return this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.__listeners[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var handler = _step.value;

            handler.apply(undefined, args);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this;
      }
    }, {
      key: 'once',
      value: function once(eventName, handler) {
        var _this = this;

        var once = function once() {
          _this.off(eventName, once);
          handler.apply(undefined, arguments);
        };

        return this.on(eventName, once);
      }
    }, {
      key: 'on',
      value: function on(eventName, handler) {
        if (!this.__listeners[eventName]) this.__listeners[eventName] = [];

        this.__listeners[eventName].push(handler);

        return this;
      }
    }, {
      key: 'off',
      value: function off(eventName, handler) {
        if (handler) this.__listeners[eventName] = this.__listeners[eventName].filter(function (h) {
          return h !== handler;
        });else this.__listeners[eventName] = [];

        return this;
      }
    }]);

    return TinyEmitter;
  }();

  var tinyEmitter = TinyEmitter$1;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var TinyEmitter = tinyEmitter;

  var MESSAGE_RESULT = 0;
  var MESSAGE_EVENT = 1;

  var RESULT_ERROR = 0;
  var RESULT_SUCCESS = 1;

  var DEFAULT_HANDLER = 'main';

  var isPromise = function isPromise(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && typeof o.then === 'function' && typeof o.catch === 'function';
  };

  function RegisterPromise(fn) {
    var handlers = _defineProperty({}, DEFAULT_HANDLER, fn);
    var sendPostMessage = self.postMessage.bind(self);

    var server = new (function (_TinyEmitter) {
      _inherits(WorkerRegister, _TinyEmitter);

      function WorkerRegister() {
        _classCallCheck(this, WorkerRegister);

        return _possibleConstructorReturn(this, (WorkerRegister.__proto__ || Object.getPrototypeOf(WorkerRegister)).apply(this, arguments));
      }

      _createClass(WorkerRegister, [{
        key: 'emit',
        value: function emit(eventName) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (args.length == 1 && args[0] instanceof TransferableResponse) {
            sendPostMessage({ eventName: eventName, args: args }, args[0].transferable);
          } else {
            sendPostMessage({ eventName: eventName, args: args });
          }
          return this;
        }
      }, {
        key: 'emitLocally',
        value: function emitLocally(eventName) {
          var _get2;

          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          (_get2 = _get(WorkerRegister.prototype.__proto__ || Object.getPrototypeOf(WorkerRegister.prototype), 'emit', this)).call.apply(_get2, [this, eventName].concat(args));
        }
      }, {
        key: 'operation',
        value: function operation(name, handler) {
          handlers[name] = handler;
          return this;
        }
      }]);

      return WorkerRegister;
    }(TinyEmitter))();

    var run = function run(messageId, payload, handlerName) {

      var onSuccess = function onSuccess(result) {
        if (result && result instanceof TransferableResponse) {
          sendResult(messageId, RESULT_SUCCESS, result.payload, result.transferable);
        } else {
          sendResult(messageId, RESULT_SUCCESS, result);
        }
      };

      var onError = function onError(e) {
        sendResult(messageId, RESULT_ERROR, {
          message: e.message,
          stack: e.stack
        });
      };

      try {
        var result = runFn(messageId, payload, handlerName);
        if (isPromise(result)) {
          result.then(onSuccess).catch(onError);
        } else {
          onSuccess(result);
        }
      } catch (e) {
        onError(e);
      }
    };

    var runFn = function runFn(messageId, payload, handlerName) {
      var handler = handlers[handlerName || DEFAULT_HANDLER];
      if (!handler) throw new Error('Not found handler for this request');

      return handler(payload, sendEvent.bind(null, messageId));
    };

    var sendResult = function sendResult(messageId, success, payload) {
      var transferable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      sendPostMessage([MESSAGE_RESULT, messageId, success, payload], transferable);
    };

    var sendEvent = function sendEvent(messageId, eventName, payload) {
      if (!eventName) throw new Error('eventName is required');

      if (typeof eventName !== 'string') throw new Error('eventName should be string');

      sendPostMessage([MESSAGE_EVENT, messageId, eventName, payload]);
    };

    self.addEventListener('message', function (_ref) {
      var data = _ref.data;

      if (Array.isArray(data)) {
        run.apply(undefined, _toConsumableArray(data));
      } else if (data && data.eventName) {
        server.emitLocally.apply(server, [data.eventName].concat(_toConsumableArray(data.args)));
      }
    });

    return server;
  }

  var TransferableResponse = function TransferableResponse(payload, transferable) {
    _classCallCheck(this, TransferableResponse);

    this.payload = payload;
    this.transferable = transferable;
  };

  register.exports = RegisterPromise;
  register.exports.TransferableResponse = TransferableResponse;

  var registerWebworker = register.exports;

  /**
   *
   * @param {ArrayBuffer} imageBuffer
   * @param {string} mimeType
   * @param {string} channel
   * @returns {Promise<ImageData>}
   */
  registerWebworker(async _ref => {
    let {
      imageBuffer,
      mimeType,
      channel
    } = _ref;
    const channelsMap = {
      r: 0,
      g: 1,
      b: 2
    };
    const blob = new Blob([imageBuffer], {
      type: mimeType
    });
    const img = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const bitmap = ctx.getImageData(0, 0, img.width, img.height);
    if (channel) {
      const idx = channelsMap[channel];
      for (let i = 0; i < bitmap.data.length; i += 4) {
        const channelValue = bitmap.data[i + idx];
        bitmap.data[i] = channelValue; // red channel
        bitmap.data[i + 1] = channelValue; // green channel
        bitmap.data[i + 2] = channelValue; // blue channel
      }
    }

    return {
      bitmap
    };
  });

})();
}, null);
/* eslint-enable */

export { WorkerFactory as W };
