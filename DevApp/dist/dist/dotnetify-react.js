(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("@aspnet/signalr"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "@aspnet/signalr", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["dotnetify"] = factory(require("react"), require("@aspnet/signalr"), require("react-dom"));
	else
		root["dotnetify"] = factory(root["React"], root["signalR"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__22__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotnetify2 = __webpack_require__(13);

var _dotnetify3 = _interopRequireDefault(_dotnetify2);

var _dotnetifyVm = __webpack_require__(5);

var _dotnetifyVm2 = _interopRequireDefault(_dotnetifyVm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
Copyright 2017-2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
if (typeof window == 'undefined') window = global;
var dotnetify = window.dotnetify || _dotnetify3.default;

dotnetify.react = {
  version: '2.0.0',
  viewModels: {},
  plugins: {},
  controller: dotnetify,

  // Internal variables.
  _responseSubs: null,
  _reconnectedSubs: null,
  _connectedSubs: null,
  _connectionFailedSubs: null,

  // Initializes connection to SignalR server hub.
  init: function init() {
    var self = dotnetify.react;

    if (!self._responseSubs) {
      self._responseSubs = dotnetify.responseEvent.subscribe(function (iVMId, iVMData) {
        return self._responseVM(iVMId, iVMData);
      });
    }

    if (!self._connectedSubs) {
      self._connectedSubs = dotnetify.connectedEvent.subscribe(function () {
        return Object.keys(self.viewModels).forEach(function (vmId) {
          return !self.viewModels[vmId].$requested && self.viewModels[vmId].$request();
        });
      });
    }

    var start = function start() {
      if (!dotnetify.isHubStarted) Object.keys(self.viewModels).forEach(function (vmId) {
        return self.viewModels[vmId].$requested = false;
      });
      dotnetify.startHub();
    };

    if (!self._reconnectedSubs) {
      self._reconnectedSubs = dotnetify.reconnectedEvent.subscribe(start);
    }

    dotnetify.initHub();
    start();
  },

  // Connects to a server view model.
  connect: function connect(iVMId, iReact, iOptions) {
    if (arguments.length < 2) throw new Error('[dotNetify] Missing arguments. Usage: connect(vmId, component) ');

    if (dotnetify.ssr && dotnetify.react.ssrConnect) {
      var vmArg = iOptions && iOptions['vmArg'];
      return dotnetify.react.ssrConnect(iVMId, iReact, vmArg);
    }

    var self = dotnetify.react;
    if (self.viewModels.hasOwnProperty(iVMId)) {
      console.error('Component is attempting to connect to an already active \'' + iVMId + '\'. ' + ' If it\'s from a dismounted component, you must add vm.$destroy to componentWillUnmount().');
      self.viewModels[iVMId].$destroy();
      return setTimeout(function () {
        return self.connect(iVMId, iReact, iOptions);
      });
    }

    var component = {
      get props() {
        return iReact.props;
      },
      get state() {
        return iReact.state;
      },
      setState: function setState(state) {
        iReact.setState(state);
      }
    };
    self.viewModels[iVMId] = new _dotnetifyVm2.default(iVMId, component, iOptions, dotnetify.react);

    self.init();
    return self.viewModels[iVMId];
  },

  // Get all view models.
  getViewModels: function getViewModels() {
    var self = dotnetify.react;
    return Object.keys(self.viewModels).map(function (vmId) {
      return self.viewModels[vmId];
    });
  },

  _responseVM: function _responseVM(iVMId, iVMData) {
    var self = dotnetify.react;

    if (self.viewModels.hasOwnProperty(iVMId)) {
      var vm = self.viewModels[iVMId];
      dotnetify.checkServerSideException(iVMId, iVMData, vm.$exceptionHandler);
      vm.$update(iVMData);
      return true;
    }
    return false;
  }
};

exports.default = dotnetify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* 
Copyright 2017 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

var jQueryDeferred = __webpack_require__(10);
var jQueryShim = jQueryDeferred.extend(function (selector) {

   if (selector === window || selector.document) return {
      0: selector,
      on: function on(iEvent, iHandler) {
         window.addEventListener(iEvent, iHandler);
      },
      bind: function bind(iEvent, iHandler) {
         window.addEventListener(iEvent, iHandler, false);
      },
      unbind: function unbind(iEvent, iHandler) {
         window.removeEventListener(iEvent, iHandler, false);
      }
   };

   if (typeof selector !== "string") selector.events = selector.events || {};

   return {
      0: selector,

      bind: function bind(iEvent, iHandler) {
         var event = selector.events[iEvent] || [];
         event.push(iHandler);
         selector.events[iEvent] = event;
      },

      unbind: function unbind(iEvent, iHandler) {
         var handlers = selector.events[iEvent] || [];
         if (iHandler) {
            var idx = handlers.indexOf(iHandler);
            if (idx !== -1) handlers.splice(idx, 1);
         } else handlers = [];
         selector.events[iEvent] = handlers;
      },

      triggerHandler: function triggerHandler(iEvent, iArgs) {
         var handlers = selector.events[iEvent] || [];
         var args = [{ type: iEvent }];
         if (Array.isArray(iArgs)) iArgs.forEach(function (arg) {
            args.push(arg);
         });else if (iArgs) args.push(iArgs);
         handlers.forEach(function (handler) {
            handler.apply(this, args);
         });
      },

      load: function load(iUrl, iArgs, iHandler) {
         var request = new window.XMLHttpRequest();
         request.open('GET', iUrl, true);
         request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
               var response = request.responseText;
               document.querySelector(selector).innerHTML = response;
               iHandler.call(document.querySelector(selector));
            }
         };
         request.send();
         return { abort: function abort(reason) {
               return request.abort(reason);
            } };
      }
   };
}, jQueryDeferred, {
   support: { cors: true },

   trim: function trim(iStr) {
      return typeof iStr === "string" ? iStr.trim() : iStr;
   },

   inArray: function inArray(iArray, iItem) {
      return iArray.indexOf(iItem) !== -1;
   },

   makeArray: function makeArray(iArray) {
      return [].slice.call(iArray, 0);
   },

   merge: function merge(iArray1, iArray2) {
      Array.prototype.push.apply(iArray1, iArray2);return iArray1;
   },

   isEmptyObject: function isEmptyObject(iObj) {
      return !iObj || Object.keys(iObj).length === 0;
   },

   ajax: function ajax(iOptions) {
      var request = new window.XMLHttpRequest();
      request.onreadystatechange = function () {
         if (request.readyState !== 4) return;
         if (request.status === 200 && !request._hasError) {
            try {
               iOptions.success && iOptions.success(JSON.parse(request.responseText));
            } catch (error) {
               iOptions.success && iOptions.success(request.responseText);
            }
         } else iOptions.error && iOptions.error(request);
      };
      request.open(iOptions.type, iOptions.url);
      request.setRequestHeader("content-type", iOptions.contentType);
      request.send(iOptions.data.data && "data=" + iOptions.data.data);
      return {
         abort: function abort(reason) {
            return request.abort(reason);
         }
      };
   },

   getScript: function getScript(iUrl, iSuccess) {
      var done = false;
      var promise = jQueryDeferred.Deferred();
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.src = iUrl;
      script.onload = script.onreadystatechange = function () {
         if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
            done = true;
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
            if (typeof iSuccess === "function") iSuccess();
            promise.resolve();
         }
      };
      head.appendChild(script);
      return promise;
   }
});

if (typeof window !== "undefined") window.jQuery = window.jQuery || jQueryShim;

if (( false ? undefined : _typeof(exports)) === "object" && ( false ? undefined : _typeof(module)) === "object") module.exports = jQueryShim;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
Copyright 2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

var utils = function () {
  function utils() {
    _classCallCheck(this, utils);
  }

  _createClass(utils, [{
    key: 'trim',

    // Trim slashes from start and end of string.
    value: function trim(iStr) {
      if (typeof iStr !== 'string') return '';

      while (iStr.indexOf('/', iStr.length - 1) >= 0) {
        iStr = iStr.substr(0, iStr.length - 1);
      }while (iStr.indexOf('/') == 0) {
        iStr = iStr.substr(1, iStr.length - 1);
      }return iStr;
    }

    // Match two strings case-insensitive.

  }, {
    key: 'equal',
    value: function equal(iStr1, iStr2) {
      return iStr1 != null && iStr2 != null && iStr1.toLowerCase() == iStr2.toLowerCase();
    }

    // Whether the string starts or ends with a value.

  }, {
    key: 'startsWith',
    value: function startsWith(iStr, iValue) {
      return iStr.toLowerCase().slice(0, iValue.length) == iValue.toLowerCase();
    }
  }, {
    key: 'endsWith',
    value: function endsWith(iStr, iValue) {
      return iValue == '' || iStr.toLowerCase().slice(-iValue.length) == iValue.toLowerCase();
    }

    // Dispatch event with IE polyfill.

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(iEvent) {
      if (typeof Event === 'function') window.dispatchEvent(new Event(iEvent));else {
        var event = document.createEvent('CustomEvent');
        event.initEvent(iEvent, true, true);
        window.dispatchEvent(event);
      }
    }
  }, {
    key: 'grep',
    value: function grep(iArray, iFilter) {
      return Array.isArray(iArray) ? iArray.filter(iFilter) : [];
    }
  }]);

  return utils;
}();

var createEventEmitter = exports.createEventEmitter = function createEventEmitter(_) {
  var subscribers = [];
  return {
    emit: function emit() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var handled = false;
      subscribers.forEach(function (subscriber) {
        handled = subscriber.apply(undefined, _toConsumableArray(args)) || handled;
      });
      return handled;
    },
    subscribe: function subscribe(subscriber) {
      !subscribers.includes(subscriber) && subscribers.push(subscriber);
      return function () {
        return subscribers = subscribers.filter(function (x) {
          return x !== subscriber;
        });
      };
    }
  };
};

exports.default = new utils();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _jqueryShim = __webpack_require__(1);

var _jqueryShim2 = _interopRequireDefault(_jqueryShim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Client-side view model that acts as a proxy of the server view model.
var dotnetifyVM = function () {
  // iVMId - identifies the view model.
  // iComponent - component object.
  // iOptions - Optional configuration options:
  //    getState: state accessor.
  //    setState: state mutator.
  //    vmArg: view model arguments.
  //    headers: request headers, for things like authentication token.
  // iDotNetify - framework-specific dotNetify library.
  function dotnetifyVM(iVMId, iComponent, iOptions, iDotNetify) {
    var _this = this;

    _classCallCheck(this, dotnetifyVM);

    this.$vmId = iVMId;
    this.$component = iComponent;
    this.$vmArg = iOptions && iOptions['vmArg'];
    this.$headers = iOptions && iOptions['headers'];
    this.$exceptionHandler = iOptions && iOptions['exceptionHandler'];
    this.$requested = false;
    this.$loaded = false;
    this.$itemKey = {};
    this.$dotnetify = iDotNetify;

    var getState = iOptions && iOptions['getState'];
    var setState = iOptions && iOptions['setState'];
    getState = typeof getState === 'function' ? getState : function () {
      return iComponent.state;
    };
    setState = typeof setState === 'function' ? setState : function (state) {
      return iComponent.setState(state);
    };

    this.State = function (state) {
      return typeof state === 'undefined' ? getState() : setState(state);
    };
    this.Props = function (prop) {
      return _this.$component.props && _this.$component.props[prop];
    };

    var vmArg = this.Props('vmArg');
    if (vmArg) this.$vmArg = _jqueryShim2.default.extend(this.$vmArg, vmArg);

    // Inject plugin functions into this view model.
    this.$getPlugins().map(function (plugin) {
      return typeof plugin['$inject'] == 'function' ? plugin.$inject(_this) : null;
    });
  }

  // Disposes the view model, both here and on the server.


  _createClass(dotnetifyVM, [{
    key: '$destroy',
    value: function $destroy() {
      var _this2 = this;

      // Call any plugin's $destroy function if provided.
      this.$getPlugins().map(function (plugin) {
        return typeof plugin['$destroy'] == 'function' ? plugin.$destroy.apply(_this2) : null;
      });

      var controller = this.$dotnetify.controller;
      if (controller.isConnected()) {
        try {
          controller.disposeVM(this.$vmId);
        } catch (ex) {
          controller._triggerConnectionStateEvent('error', ex);
        }
      }

      delete this.$dotnetify.viewModels[this.$vmId];
    }

    // Dispatches a value to the server view model.
    // iValue - Vvalue to dispatch.

  }, {
    key: '$dispatch',
    value: function $dispatch(iValue) {
      var controller = this.$dotnetify.controller;
      if (controller.isConnected()) {
        try {
          controller.updateVM(this.$vmId, iValue);

          if (controller.debug) {
            console.log('[' + this.$vmId + '] sent> ');
            console.log(iValue);

            controller.debugFn && controller.debugFn(this.$vmId, 'sent', iValue);
          }
        } catch (ex) {
          controller._triggerConnectionStateEvent('error', ex);
        }
      }
    }

    // Dispatches a state value to the server view model.
    // iValue - State value to dispatch.

  }, {
    key: '$dispatchListState',
    value: function $dispatchListState(iValue) {
      var _this3 = this;

      var _loop = function _loop() {
        var key = _this3.$itemKey[listName];
        if (!key) {
          console.error('[' + _this3.$vmId + '] missing item key for \'' + listName + '\'; add ' + listName + '_itemKey property to the view model.');
          return {
            v: void 0
          };
        }
        item = iValue[listName];

        if (!item[key]) {
          console.error('[' + _this3.$vmId + '] couldn\'t dispatch data from \'' + listName + '\' due to missing property \'' + key + '\'.');
          console.error(item);
          return {
            v: void 0
          };
        }

        Object.keys(item).forEach(function (prop) {
          if (prop != key) {
            var state = {};
            state[listName + '.$' + item[key] + '.' + prop] = item[prop];
            _this3.$dispatch(state);
          }
        });
        _this3.$updateList(listName, item);
      };

      for (var listName in iValue) {
        var item;

        var _ret = _loop();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: '$getPlugins',
    value: function $getPlugins() {
      var _this4 = this;

      return Object.keys(this.$dotnetify.plugins).map(function (id) {
        return _this4.$dotnetify.plugins[id];
      });
    }

    // Preprocess view model update from the server before we set the state.

  }, {
    key: '$preProcess',
    value: function $preProcess(iVMUpdate) {
      var vm = this;

      for (var prop in iVMUpdate) {
        // Look for property that end with '_add'. Interpret the value as a list item to be added
        // to an existing list whose property name precedes that suffix.
        var match = /(.*)_add/.exec(prop);
        if (match != null) {
          var listName = match[1];
          if (Array.isArray(this.State()[listName])) vm.$addList(listName, iVMUpdate[prop]);else console.error('unable to resolve ' + prop);
          delete iVMUpdate[prop];
          continue;
        }

        // Look for property that end with '_update'. Interpret the value as a list item to be updated
        // to an existing list whose property name precedes that suffix.
        var match = /(.*)_update/.exec(prop);
        if (match != null) {
          var listName = match[1];
          if (Array.isArray(this.State()[listName])) vm.$updateList(listName, iVMUpdate[prop]);else console.error('[' + this.$vmId + "] '" + listName + "' is not found or not an array.");
          delete iVMUpdate[prop];
          continue;
        }

        // Look for property that end with '_remove'. Interpret the value as a list item key to remove
        // from an existing list whose property name precedes that suffix.
        var match = /(.*)_remove/.exec(prop);
        if (match != null) {
          var listName = match[1];
          if (Array.isArray(this.State()[listName])) {
            var key = this.$itemKey[listName];
            if (key != null) vm.$removeList(listName, function (i) {
              return i[key] == iVMUpdate[prop];
            });else console.error('[' + this.$vmId + '] missing item key for \'' + listName + '\'; add ' + listName + '_itemKey property to the view model.');
          } else console.error('[' + this.$vmId + '] \'' + listName + '\' is not found or not an array.');
          delete iVMUpdate[prop];
          continue;
        }

        // Look for property that end with '_itemKey'. Interpret the value as the property name that will
        // uniquely identify items in the list.
        var match = /(.*)_itemKey/.exec(prop);
        if (match != null) {
          var listName = match[1];
          var itemKey = {};
          itemKey[listName] = iVMUpdate[prop];
          vm.$setItemKey(itemKey);
          delete iVMUpdate[prop];
          continue;
        }
      }
    }

    // Requests state from the server view model.

  }, {
    key: '$request',
    value: function $request() {
      var controller = this.$dotnetify.controller;
      if (controller.isConnected()) {
        controller.requestVM(this.$vmId, { $vmArg: this.$vmArg, $headers: this.$headers });
        this.$requested = true;
      }
    }

    // Updates state from the server view model to the view.
    // iVMData - Serialized state from the server.

  }, {
    key: '$update',
    value: function $update(iVMData) {
      var controller = this.$dotnetify.controller;
      if (controller.debug) {
        console.log('[' + this.$vmId + '] received> ');
        console.log(JSON.parse(iVMData));

        controller.debugFn && controller.debugFn(this.$vmId, 'received', JSON.parse(iVMData));
      }
      var vmData = JSON.parse(iVMData);
      this.$preProcess(vmData);

      var state = this.State();
      state = _jqueryShim2.default.extend({}, state, vmData);
      this.State(state);

      if (!this.$loaded) this.$onLoad();
    }

    // Handles initial view model load event.

  }, {
    key: '$onLoad',
    value: function $onLoad() {
      var _this5 = this;

      // Call any plugin's $ready function if provided to give a chance to do
      // things when the view model is ready.
      this.$getPlugins().map(function (plugin) {
        return typeof plugin['$ready'] == 'function' ? plugin.$ready.apply(_this5) : null;
      });
      this.$loaded = true;
    }

    // *** CRUD Functions ***

    // Sets items key to identify individual items in a list.
    // Accepts object literal: { "<list name>": "<key prop name>", ... }

  }, {
    key: '$setItemKey',
    value: function $setItemKey(iItemKey) {
      this.$itemKey = iItemKey;
    }

    //// Adds a new item to a state array.

  }, {
    key: '$addList',
    value: function $addList(iListName, iNewItem) {
      // Check if the list already has an item with the same key. If so, replace it.
      var key = this.$itemKey[iListName];
      if (key != null) {
        if (!iNewItem.hasOwnProperty(key)) {
          console.error('[' + this.$vmId + '] couldn\'t add item to \'' + iListName + '\' due to missing property \'' + key + '\'.');
          return;
        }
        var match = this.State()[iListName].filter(function (i) {
          return i[key] == iNewItem[key];
        });
        if (match.length > 0) {
          console.error('[' + this.$vmId + '] couldn\'t add item to \'' + iListName + '\' because the key already exists.');
          return;
        }
      }

      var items = this.State()[iListName];
      items.push(iNewItem);

      var state = {};
      state[iListName] = items;
      this.State(state);
    }

    // Removes an item from a state array.

  }, {
    key: '$removeList',
    value: function $removeList(iListName, iFilter) {
      var state = {};
      state[iListName] = this.State()[iListName].filter(function (i) {
        return !iFilter(i);
      });
      this.State(state);
    }

    //// Updates existing item to an observable array.

  }, {
    key: '$updateList',
    value: function $updateList(iListName, iNewItem) {
      // Check if the list already has an item with the same key. If so, update it.
      var key = this.$itemKey[iListName];
      if (key != null) {
        if (!iNewItem.hasOwnProperty(key)) {
          console.error('[' + this.$vmId + '] couldn\'t update item to \'' + iListName + '\' due to missing property \'' + key + '\'.');
          return;
        }
        var state = {};
        state[iListName] = this.State()[iListName].map(function (i) {
          return i[key] == iNewItem[key] ? _jqueryShim2.default.extend(i, iNewItem) : i;
        });
        this.State(state);
      } else console.error('[' + this.$vmId + '] missing item key for \'' + iListName + '\'; add \'' + iListName + '_itemKey\' property to the view model.');
    }
  }]);

  return dotnetifyVM;
}();

exports.default = dotnetifyVM;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
* jQuery core object.
*
* Worker with jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/core.js
*
*/

var jQuery = module.exports = {
	type: type
	, isArray: isArray
	, isFunction: isFunction
	, isPlainObject: isPlainObject
	, each: each
	, extend: extend
	, noop: function() {}
};

var toString = Object.prototype.toString;

var class2type = {};
// Populate the class2type map
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});


function type( obj ) {
	return obj == null ?
		String( obj ) :
			class2type[ toString.call(obj) ] || "object";
}

function isFunction( obj ) {
	return jQuery.type(obj) === "function";
}

function isArray( obj ) {
	return jQuery.type(obj) === "array";
}

function each( object, callback, args ) {
	var name, i = 0,
	length = object.length,
	isObj = length === undefined || isFunction( object );

	if ( args ) {
		if ( isObj ) {
			for ( name in object ) {
				if ( callback.apply( object[ name ], args ) === false ) {
					break;
				}
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.apply( object[ i++ ], args ) === false ) {
					break;
				}
			}
		}

		// A special, fast, case for the most common use of each
	} else {
		if ( isObj ) {
			for ( name in object ) {
				if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
					break;
				}
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
					break;
				}
			}
		}
	}

	return object;
}

function isPlainObject( obj ) {
	// Must be an Object.
	if ( !obj || jQuery.type(obj) !== "object" ) {
		return false;
	}
	return true;
}

function extend() {
	var options, name, src, copy, copyIsArray, clone,
	target = arguments[0] || {},
	i = 1,
	length = arguments.length,
	deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};




/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var jQuery = module.exports = __webpack_require__(7),
	core_rspace = /\s+/;
/**
* jQuery Callbacks
*
* Code from: https://github.com/jquery/jquery/blob/master/src/callbacks.js
*
*/


// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


/*!
* jquery-deferred
* Copyright(c) 2011 Hidden <zzdhidden@gmail.com>
* MIT Licensed
*/

/**
* Library version.
*/

var jQuery = module.exports = __webpack_require__(8),
	core_slice = Array.prototype.slice;

/**
* jQuery deferred
*
* Code from: https://github.com/jquery/jquery/blob/master/src/deferred.js
* Doc: http://api.jquery.com/category/deferred-object/
*
*/

jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(9);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqueryShim = __webpack_require__(1);

var _jqueryShim2 = _interopRequireDefault(_jqueryShim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signalRNetCore = __webpack_require__(6); /* 
                                                 Copyright 2017-2018 Dicky Suryadi
                                                 
                                                 Licensed under the Apache License, Version 2.0 (the "License");
                                                 you may not use this file except in compliance with the License.
                                                 You may obtain a copy of the License at
                                                 
                                                     http://www.apache.org/licenses/LICENSE-2.0
                                                 
                                                 Unless required by applicable law or agreed to in writing, software
                                                 distributed under the License is distributed on an "AS IS" BASIS,
                                                 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                 See the License for the specific language governing permissions and
                                                 limitations under the License.
                                                  */

var $ = _jqueryShim2.default;

if (typeof window == 'undefined') window = global;

var dotnetifyHub = $.extend(dotnetifyHub, {
  version: '1.2.0',
  type: null,
  _init: false
});

dotnetifyHub.init = function (iHubPath, iServerUrl, signalR) {
  if (dotnetifyHub._init) return;

  dotnetifyHub._init = true;
  signalR = signalR || window.signalR || signalRNetCore;

  // SignalR .NET Core.
  if (signalR && signalR.HubConnection) {
    dotnetifyHub.type = 'netcore';

    Object.defineProperty(dotnetifyHub, 'isConnected', {
      get: function get() {
        return dotnetifyHub._connection && dotnetifyHub._connection.connection.connectionState === 1;
      }
    });

    dotnetifyHub = $.extend(dotnetifyHub, {
      hubPath: iHubPath || '/dotnetify',
      url: iServerUrl,
      reconnectDelay: [2, 5, 10],
      reconnectRetry: null,

      // Internal variables. Do not modify!
      _connection: null,
      _reconnectCount: 0,
      _startDoneHandler: null,
      _startFailHandler: null,
      _disconnectedHandler: function _disconnectedHandler() {},
      _stateChangedHandler: function _stateChangedHandler(iNewState) {},

      _onDisconnected: function _onDisconnected() {
        dotnetifyHub._changeState(4);
        dotnetifyHub._disconnectedHandler();
      },

      _changeState: function _changeState(iNewState) {
        if (iNewState == 1) dotnetifyHub._reconnectCount = 0;

        var stateText = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected', 99: 'terminated' };
        dotnetifyHub._stateChangedHandler(stateText[iNewState]);
      },

      _startConnection: function _startConnection(iHubOptions, iTransportArray) {
        var url = dotnetifyHub.url ? dotnetifyHub.url + dotnetifyHub.hubPath : dotnetifyHub.hubPath;
        var hubOptions = {};
        Object.keys(iHubOptions).forEach(function (key) {
          hubOptions[key] = iHubOptions[key];
        });
        hubOptions.transport = iTransportArray.shift();

        dotnetifyHub._connection = new signalR.HubConnectionBuilder().withUrl(url, hubOptions).build();
        dotnetifyHub._connection.on('response_vm', dotnetifyHub.client.response_VM);
        dotnetifyHub._connection.onclose(dotnetifyHub._onDisconnected);

        var promise = dotnetifyHub._connection.start().then(function () {
          dotnetifyHub._changeState(1);
        }).catch(function () {
          // If failed to start, fallback to the next transport.
          if (iTransportArray.length > 0) dotnetifyHub._startConnection(iHubOptions, iTransportArray);else dotnetifyHub._onDisconnected();
        });

        if (typeof dotnetifyHub._startDoneHandler === 'function') promise.then(dotnetifyHub._startDoneHandler).catch(dotnetifyHub._startFailHandler || function () {});
        return promise;
      },

      start: function start(iHubOptions) {
        dotnetifyHub._startDoneHandler = null;
        dotnetifyHub._startFailHandler = null;

        // Map the transport option.
        var transport = [0];
        var transportOptions = { webSockets: 0, serverSentEvents: 1, longPolling: 2 };
        if (iHubOptions && Array.isArray(iHubOptions.transport)) transport = iHubOptions.transport.map(function (arg) {
          return transportOptions[arg];
        });

        var promise = dotnetifyHub._startConnection(iHubOptions, transport);
        return {
          done: function done(iHandler) {
            dotnetifyHub._startDoneHandler = iHandler;
            promise.then(iHandler).catch(function () {});
            return this;
          },
          fail: function fail(iHandler) {
            dotnetifyHub._startFailHandler = iHandler;
            promise.catch(iHandler);
            return this;
          }
        };
      },

      disconnected: function disconnected(iHandler) {
        if (typeof iHandler === 'function') dotnetifyHub._disconnectedHandler = iHandler;
      },

      stateChanged: function stateChanged(iHandler) {
        if (typeof iHandler === 'function') dotnetifyHub._stateChangedHandler = iHandler;
      },

      reconnect: function reconnect(iStartHubFunc) {
        if (typeof iStartHubFunc === 'function') {
          // Only attempt reconnect if the specified retry hasn't been exceeded.
          if (!dotnetifyHub.reconnectRetry || dotnetifyHub._reconnectCount < dotnetifyHub.reconnectRetry) {
            // Determine reconnect delay from the specified configuration array.
            var delay = dotnetifyHub._reconnectCount < dotnetifyHub.reconnectDelay.length ? dotnetifyHub.reconnectDelay[dotnetifyHub._reconnectCount] : dotnetifyHub.reconnectDelay[dotnetifyHub.reconnectDelay.length - 1];

            dotnetifyHub._reconnectCount++;

            setTimeout(function () {
              dotnetifyHub._changeState(2);
              iStartHubFunc();
            }, delay * 1000);
          } else dotnetifyHub._changeState(99);
        }
      },

      client: {},

      server: {
        dispose_VM: function dispose_VM(iVMId) {
          dotnetifyHub._connection.invoke('Dispose_VM', iVMId);
        },
        update_VM: function update_VM(iVMId, iValue) {
          dotnetifyHub._connection.invoke('Update_VM', iVMId, iValue);
        },
        request_VM: function request_VM(iVMId, iArgs) {
          dotnetifyHub._connection.invoke('Request_VM', iVMId, iArgs);
        }
      }
    });
  } else {
    // SignalR .NET FX.
    dotnetifyHub.type = 'netfx';

    if (window.jQuery) $ = window.jQuery;

    // SignalR hub auto-generated from /signalr/hubs.
    /// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
    /// <reference path="jquery.signalR.js" />
    (function ($, window, undefined) {
      /// <param name="$" type="jQuery" />
      'use strict';

      if (typeof $.signalR !== 'function') {
        throw new Error('SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.');
      }

      var signalR = $.signalR;

      function makeProxyCallback(hub, callback) {
        return function () {
          // Call the client hub method
          callback.apply(hub, $.makeArray(arguments));
        };
      }

      function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
          if (instance.hasOwnProperty(key)) {
            hub = instance[key];

            if (!hub.hubName) {
              // Not a client hub
              continue;
            }

            if (shouldSubscribe) {
              // We want to subscribe to the hub events
              subscriptionMethod = hub.on;
            } else {
              // We want to unsubscribe from the hub events
              subscriptionMethod = hub.off;
            }

            // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
            for (memberKey in hub.client) {
              if (hub.client.hasOwnProperty(memberKey)) {
                memberValue = hub.client[memberKey];

                if (!$.isFunction(memberValue)) {
                  // Not a client hub function
                  continue;
                }

                subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
              }
            }
          }
        }
      }

      $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
          // Register the hub proxies as subscribed
          // (instance, shouldSubscribe)
          registerHubProxies(proxies, true);

          this._registerSubscribedHubs();
        }).disconnected(function () {
          // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
          // (instance, shouldSubscribe)
          registerHubProxies(proxies, false);
        });

        proxies['dotNetifyHub'] = this.createHubProxy('dotNetifyHub');
        proxies['dotNetifyHub'].client = {};
        proxies['dotNetifyHub'].server = {
          dispose_VM: function dispose_VM(vmId) {
            return proxies['dotNetifyHub'].invoke.apply(proxies['dotNetifyHub'], $.merge(['Dispose_VM'], $.makeArray(arguments)));
          },

          request_VM: function request_VM(vmId, vmArg) {
            return proxies['dotNetifyHub'].invoke.apply(proxies['dotNetifyHub'], $.merge(['Request_VM'], $.makeArray(arguments)));
          },

          update_VM: function update_VM(vmId, vmData) {
            return proxies['dotNetifyHub'].invoke.apply(proxies['dotNetifyHub'], $.merge(['Update_VM'], $.makeArray(arguments)));
          }
        };

        return proxies;
      };

      signalR.hub = $.hubConnection(dotnetifyHub.hubPath, { useDefaultPath: false });
      $.extend(signalR, signalR.hub.createHubProxies());
    })($, window);

    Object.defineProperty(dotnetifyHub, 'state', {
      get: function get() {
        return $.connection.hub.state;
      },
      set: function set(val) {
        $.connection.hub.state = val;
      }
    });

    Object.defineProperty(dotnetifyHub, 'client', {
      get: function get() {
        return $.connection.dotNetifyHub.client;
      }
    });

    Object.defineProperty(dotnetifyHub, 'server', {
      get: function get() {
        return $.connection.dotNetifyHub.server;
      }
    });

    Object.defineProperty(dotnetifyHub, 'isConnected', {
      get: function get() {
        return $.connection.hub.state == $.signalR.connectionState.connected;
      }
    });

    dotnetifyHub = $.extend(dotnetifyHub, {
      hubPath: iHubPath || '/signalr',
      url: iServerUrl,
      reconnectDelay: [2, 5, 10],
      reconnectRetry: null,

      _reconnectCount: 0,
      _stateChangedHandler: function _stateChangedHandler(iNewState) {},

      start: function start(iHubOptions) {
        if (dotnetifyHub.url) $.connection.hub.url = dotnetifyHub.url;

        var deferred;
        if (iHubOptions) deferred = $.connection.hub.start(iHubOptions);else deferred = $.connection.hub.start();
        deferred.fail(function (error) {
          if (error.source && error.source.message === 'Error parsing negotiate response.') console.warn('This client may be attempting to connect to an incompatible SignalR .NET Core server.');
        });
        return deferred;
      },

      disconnected: function disconnected(iHandler) {
        return $.connection.hub.disconnected(iHandler);
      },

      stateChanged: function stateChanged(iHandler) {
        dotnetifyHub._stateChangedHandler = iHandler;
        return $.connection.hub.stateChanged(function (state) {
          if (state == 1) dotnetifyHub._reconnectCount = 0;

          var stateText = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
          iHandler(stateText[state.newState]);
        });
      },

      reconnect: function reconnect(iStartHubFunc) {
        if (typeof iStartHubFunc === 'function') {
          // Only attempt reconnect if the specified retry hasn't been exceeded.
          if (!dotnetifyHub.reconnectRetry || dotnetifyHub._reconnectCount < dotnetifyHub.reconnectRetry) {
            // Determine reconnect delay from the specified configuration array.
            var delay = dotnetifyHub._reconnectCount < dotnetifyHub.reconnectDelay.length ? dotnetifyHub.reconnectDelay[dotnetifyHub._reconnectCount] : dotnetifyHub.reconnectDelay[dotnetifyHub.reconnectDelay.length - 1];

            dotnetifyHub._reconnectCount++;

            setTimeout(function () {
              dotnetifyHub._stateChangedHandler('reconnecting');
              iStartHubFunc();
            }, delay * 1000);
          } else dotnetifyHub._stateChangedHandler('terminated');
        }
      }
    });
  }
};

exports.default = dotnetifyHub;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotnetifyHub = __webpack_require__(12);

var _dotnetifyHub2 = _interopRequireDefault(_dotnetifyHub);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
Copyright 2017-2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var dotnetify = {
  // SignalR hub options.
  hub: _dotnetifyHub2.default,
  hubOptions: { transport: ['webSockets', 'longPolling'] },
  hubPath: null,
  hubServerUrl: null,

  // Debug mode.
  debug: false,
  debugFn: null,

  // Offline mode. (WIP)
  offline: false,
  isOffline: true,
  offlineTimeout: 5000,
  offlineCacheFn: null,

  // Handler for connection state changed events.
  connectionStateHandler: null,

  // Connection events.
  responseEvent: (0, _utils.createEventEmitter)(),
  reconnectedEvent: (0, _utils.createEventEmitter)(),
  connectedEvent: (0, _utils.createEventEmitter)(),
  connectionFailedEvent: (0, _utils.createEventEmitter)(),

  // Whether connected to SignalR hub server.
  isConnected: function isConnected() {
    return _dotnetifyHub2.default.isConnected;
  },

  // Whether SignalR hub is started.
  isHubStarted: function isHubStarted() {
    return !!dotnetify._hub;
  },

  // Generic connect function for non-React app.
  connect: function connect(iVMId, iOptions) {
    return dotnetify.react.connect(iVMId, null, iOptions);
  },

  initHub: function initHub() {
    if (dotnetify._hub !== null) return;

    _dotnetifyHub2.default.init(dotnetify.hubPath, dotnetify.hubServerUrl, dotnetify.hubLib);

    // Setup SignalR server method handler.
    _dotnetifyHub2.default.client.response_VM = function (iVMId, iVMData) {
      // SignalR .NET Core is sending an array of arguments.
      if (Array.isArray(iVMId)) {
        iVMData = iVMId[1];
        iVMId = iVMId[0];
      }

      var handled = dotnetify.responseEvent.emit(iVMId, iVMData);

      // If we get to this point, that means the server holds a view model instance
      // whose view no longer existed.  So, tell the server to dispose the view model.
      if (!handled) _dotnetifyHub2.default.server.dispose_VM(iVMId);
    };

    // On disconnected, keep attempting to start the connection.
    _dotnetifyHub2.default.disconnected(function () {
      dotnetify._hub = null;
      _dotnetifyHub2.default.reconnect(function () {
        dotnetify.reconnectedEvent.emit();
      });
    });

    // Use SignalR event to raise the connection state event.
    _dotnetifyHub2.default.stateChanged(function (state) {
      dotnetify._triggerConnectionStateEvent(state);
    });
  },


  startHub: function startHub() {
    var doneHandler = function doneHandler() {
      dotnetify.connectedEvent.emit();
    };
    var failHandler = function failHandler(ex) {
      dotnetify.connectionFailedEvent.emit();
      dotnetify._triggerConnectionStateEvent('error', ex);
    };

    if (dotnetify._hub === null) {
      dotnetify._hub = _dotnetifyHub2.default.start(dotnetify.hubOptions).done(doneHandler).fail(failHandler);
    } else dotnetify._hub.done(doneHandler);
  },

  checkServerSideException: function checkServerSideException(iVMId, iVMData, iExceptionHandler) {
    var vmData = JSON.parse(iVMData);
    if (vmData && vmData.hasOwnProperty('ExceptionType') && vmData.hasOwnProperty('Message')) {
      var exception = { name: vmData.ExceptionType, message: vmData.Message };

      if (typeof iExceptionHandler === 'function') {
        return iExceptionHandler(exception);
      } else {
        console.error('[' + iVMId + '] ' + exception.name + ': ' + exception.message);
        throw exception;
      }
    }
  },

  requestVM: function requestVM(iVMId, iOptions) {
    _dotnetifyHub2.default.server.request_VM(iVMId, iOptions);
  },
  updateVM: function updateVM(iVMId, iValue) {
    _dotnetifyHub2.default.server.update_VM(iVMId, iValue);
  },
  disposeVM: function disposeVM(iVMId) {
    _dotnetifyHub2.default.server.dispose_VM(iVMId);
  },


  _triggerConnectionStateEvent: function _triggerConnectionStateEvent(iState, iException) {
    if (dotnetify.debug) console.log('SignalR: ' + (iException ? iException.message : iState));

    if (typeof dotnetify.connectionStateHandler === 'function') dotnetify.connectionStateHandler(iState, iException);else if (iException) console.error(iException);
  },

  // Internal variables. Do not modify!
  _hub: null
};

exports.default = dotnetify;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// <RouteTarget> is a helper component to provide DOM target for routes, and is essential for server-side rendering.
var RouteTarget = function (_React$Component) {
  _inherits(RouteTarget, _React$Component);

  function RouteTarget() {
    _classCallCheck(this, RouteTarget);

    return _possibleConstructorReturn(this, (RouteTarget.__proto__ || Object.getPrototypeOf(RouteTarget)).apply(this, arguments));
  }

  _createClass(RouteTarget, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var elem = document.getElementById(this.props.id);
      if (elem != null && window.ssr && !window.ssr[this.props.id]) {
        window.ssr[this.props.id] = true;
        this.initialHtml = { __html: elem.innerHTML };
      } else this.initialHtml = { __html: '' };
    }
  }, {
    key: 'getDOMNode',
    value: function getDOMNode() {
      return this.elem;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          props = _objectWithoutProperties(_props, ['id']);

      return _react2.default.createElement('div', _extends({ id: id, ref: function ref(el) {
          return _this2.elem = el;
        } }, this.props, { dangerouslySetInnerHTML: this.initialHtml }));
    }
  }]);

  return RouteTarget;
}(_react2.default.Component);

exports.default = RouteTarget;


_dotnetifyReact2.default.react.router.RouteTarget = RouteTarget;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// <RouteLink> is a helper component to set anchor tags for routes.
var RouteLink = function (_React$Component) {
	_inherits(RouteLink, _React$Component);

	function RouteLink() {
		_classCallCheck(this, RouteLink);

		return _possibleConstructorReturn(this, (RouteLink.__proto__ || Object.getPrototypeOf(RouteLink)).apply(this, arguments));
	}

	_createClass(RouteLink, [{
		key: 'render',
		value: function render() {
			var props = this.props;
			if (props.vm == null) console.error("RouteLink requires 'vm' property.");

			var handleClick = function handleClick(event) {
				event.preventDefault();
				if (props.route == null) {
					console.error("RouteLink requires 'route' property.");
					return;
				}
				if (typeof props.onClick === 'function') props.onClick(event);
				return props.vm.$handleRoute(event);
			};

			return _react2.default.createElement('a', {
				style: props.style,
				className: props.className,
				href: props.route != null ? props.vm.$route(props.route) : '',
				children: props.children,
				onClick: handleClick
			});
		}
	}]);

	return RouteLink;
}(_react2.default.Component);

exports.default = RouteLink;


_dotnetifyReact2.default.react.router.RouteLink = RouteLink;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(16);

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, isValidElement, REACT_ELEMENT_TYPE; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(17)();
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(18);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// The <Scope> component uses React's 'context' to pass down the component hierarchy the name of the back-end view model
// of the parent component, so that when the child component connects to its back-end view model, the child view model
// instance is created within the scope of the parent view model.
//
// The <Scope> component also provides the 'connect' function for a component to connect to the back-end view model and
// injects properties and dispatch functions into the component.
var Scope = function (_React$Component) {
	_inherits(Scope, _React$Component);

	function Scope() {
		_classCallCheck(this, Scope);

		return _possibleConstructorReturn(this, (Scope.__proto__ || Object.getPrototypeOf(Scope)).apply(this, arguments));
	}

	_createClass(Scope, [{
		key: 'scoped',
		value: function scoped(vmId) {
			var scope = this.context.scoped ? this.context.scoped(this.props.vm) : this.props.vm;
			return scope ? scope + '.' + vmId : vmId;
		}
	}, {
		key: 'getChildContext',
		value: function getChildContext() {
			var _this = this;

			return {
				scoped: function scoped(vmId) {
					return _this.scoped(vmId);
				},
				connect: function connect(vmId, component, options) {
					component.vmId = _this.scoped(vmId);
					component.vm = _dotnetifyReact2.default.react.connect(component.vmId, component, options);
					component.dispatch = function (state) {
						return component.vm.$dispatch(state);
					};

					component.dispatchState = function (state) {
						component.vm.State(state);
						component.vm.$dispatch(state);
					};
					return window.vmStates ? window.vmStates[component.vmId] : null;
				}
			};
		}
	}, {
		key: 'render',
		value: function render() {
			return this.props.children;
		}
	}]);

	return Scope;
}(_react2.default.Component);

Scope.displayName = 'Scope';
Scope.version = '1.2.0';
Scope.propTypes = { vm: _propTypes2.default.string };
Scope.contextTypes = { scoped: _propTypes2.default.func };
Scope.childContextTypes = {
	scoped: _propTypes2.default.func.isRequired,
	connect: _propTypes2.default.func.isRequired
};
exports.default = Scope;


_dotnetifyReact2.default.react.Scope = Scope;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

var _dotnetifyVm = __webpack_require__(5);

var _dotnetifyVm2 = _interopRequireDefault(_dotnetifyVm);

var _jqueryShim = __webpack_require__(1);

var _jqueryShim2 = _interopRequireDefault(_jqueryShim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Used by server-side rendering in lieu of connect method.
_dotnetifyReact2.default.react.ssrConnect = function (iVMId, iReact, iVMArg) {
  if (window.ssr == null || !window.ssr.hasOwnProperty(iVMId)) console.error("Server-side rendering requires initial state in 'window.ssr." + iVMId + "'.");

  var self = _dotnetifyReact2.default.react;
  var vmState = window.ssr[iVMId];
  var getState = function getState() {
    return vmState;
  };
  var setState = function setState(state) {
    vmState = _jqueryShim2.default.extend(vmState, state);
  };
  var options = {
    getState: getState,
    setState: setState,
    vmArg: iVMArg
  };
  var vm = self.viewModels[iVMId] = new _dotnetifyVm2.default(iVMId, iReact, options, _dotnetifyReact2.default.react);

  // Need to be asynch to allow initial state to be processed.
  setTimeout(function () {
    vm.$update(JSON.stringify(window.ssr[iVMId]));
  }, 100);
  return vm;
};

// Used by client-side React component to get server-side rendered initial state.
/* 
Copyright 2017-2018 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
_dotnetifyReact2.default.react.router.ssrState = function (iVMId) {
  if (window.ssr && window.ssr[iVMId] && !window.ssr[iVMId].fetched) {
    window.ssr[iVMId].fetched = true;
    return window.ssr[iVMId];
  }
};

// Called from server to configure server-side rendering.
// iPath - initial URL path.
// iInitialStates - serialized object literal '{ "vmName": {initialState}, ...}'.
// iOverrideRouteFn - function to override routing URLs before the router loads them.
// iCallbackFn - callback after the path is fully routed.
// iTimeout - timeout in milliseconds.
_dotnetifyReact2.default.react.router.ssr = function (iPath, iInitialStates, iOverrideRouteFn, iCallbackFn, iTimeout) {
  _dotnetifyReact2.default.ssr = true;
  _dotnetifyReact2.default.react.router.urlPath = iPath;
  _dotnetifyReact2.default.react.router.overrideUrl = iOverrideRouteFn;

  // Insert initial states in the head tag.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = 'window.ssr=' + iInitialStates + ';';
  var head = document.getElementsByTagName('head')[0];
  if (head) head.insertBefore(script, head.firstChild);else console.error('router> document head tag is required for server-side render.');

  var routed = false;
  var fallback = iTimeout ? setTimeout(function () {
    if (!routed) iCallbackFn();
  }, iTimeout) : 0;
  window.addEventListener('dotnetify.routed', function () {
    routed = true;
    if (fallback != 0) clearTimeout(fallback);
    iCallbackFn();
  });

  // Add initial states into the window scope for the server-renderd components.
  window.ssr = JSON.parse(iInitialStates);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dotnetifyVMRouter = function () {
  _createClass(dotnetifyVMRouter, [{
    key: 'RoutingState',
    get: function get() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'VMRoot',
    get: function get() {
      throw new Error('Not implemented');
    }
  }, {
    key: 'VMArg',
    get: function get() {
      throw new Error('Not implemented');
    }
  }]);

  function dotnetifyVMRouter(vm, router) {
    _classCallCheck(this, dotnetifyVMRouter);

    this.routes = [];

    this.vm = vm;
    this.router = router;
    this.debug = vm.$dotnetify.controller.debug;
  }

  // Dispatch the active routing state to the server.


  _createClass(dotnetifyVMRouter, [{
    key: 'dispatchActiveRoutingState',
    value: function dispatchActiveRoutingState(iPath) {
      this.vm.$dispatch({ 'RoutingState.Active': iPath });

      var _vm$State = this.vm.State(),
          RoutingState = _vm$State.RoutingState;

      RoutingState = Object.assign(RoutingState || {}, { Active: iPath });
      this.vm.State({ RoutingState: RoutingState });
    }

    // Handles click event from anchor tags.

  }, {
    key: 'handleRoute',
    value: function handleRoute(iEvent) {
      var _this = this;

      iEvent.preventDefault();
      var path = iEvent.currentTarget.pathname;
      if (path == null || path == '') throw new Error('The event passed to $handleRoute has no path name.');

      setTimeout(function () {
        return _this.router.pushState({}, '', path);
      });
    }

    // Build the absolute root path from the "vmRoot" property on React component.

  }, {
    key: 'initRoot',
    value: function initRoot() {
      if (!this.hasRoutingState || this.RoutingState === null || this.RoutingState.Root === null) return;

      if (this._absRoot != this.RoutingState.Root) {
        var absRoot = _utils2.default.trim(this.VMRoot);
        if (absRoot != '') absRoot = '/' + absRoot;
        var root = _utils2.default.trim(this.RoutingState.Root);
        this._absRoot = root != '' ? absRoot + '/' + root : absRoot;
        this.RoutingState.Root = this._absRoot;
      }
    }

    // Initialize routing templates if the view model implements IRoutable.

  }, {
    key: 'initRouting',
    value: function initRouting() {
      var _this2 = this;

      var vm = this.vm;
      if (!this.hasRoutingState) return;

      if (this.RoutingState === null) {
        console.error("router> the RoutingState prop of '" + vm.$vmId + "' was not initialized.");
        return;
      }

      var templates = this.RoutingState.Templates;
      if (templates == null || templates.length == 0) return;

      // Initialize the router.
      if (!this.router.$init) {
        this.router.init();
        this.router.$init = true;
      }

      // Build the absolute root path.
      this.initRoot();

      templates.forEach(function (template) {
        // If url pattern isn't given, consider Id as the pattern.
        var urlPattern = template.UrlPattern != null ? template.UrlPattern : template.Id;
        urlPattern = urlPattern != '' ? urlPattern : '/';
        var mapUrl = _this2.toUrl(urlPattern);

        if (_this2.debug) console.log('router> map ' + mapUrl + ' to template id=' + template.Id);

        _this2.router.mapTo(mapUrl, function (iParams) {
          _this2.router.urlPath = '';

          // Construct the path from the template pattern and the params passed by PathJS.
          var path = urlPattern;
          for (var param in iParams) {
            path = path.replace(':' + param, iParams[param]);
          }path = path.replace(/\(\/:([^)]+)\)/g, '').replace(/\(|\)/g, '');

          _this2.routeTo(path, template);
        });
      });

      // Route initial URL.
      var activeUrl = this.toUrl(this.RoutingState.Active);
      if (this.router.urlPath == '') this.router.urlPath = activeUrl;
      if (!this.routeUrl())
        // If routing ends incomplete, raise routed event anyway.
        this.raiseRoutedEvent(true);
    }

    // Whether a route is active.

  }, {
    key: 'isActive',
    value: function isActive(iRoute) {
      if (iRoute != null && iRoute.hasOwnProperty('Path')) {
        return _utils2.default.equal(iRoute.Path, this.RoutingState.Active);
      }
      return false;
    }

    // Loads a view into a target element.

  }, {
    key: 'loadView',
    value: function loadView(iTargetSelector, iViewUrl, iJsModuleUrl, iVmArg, iCallbackFn) {
      throw new Error('Not implemented');
    }

    // Routes to a path.

  }, {
    key: 'manualRouteTo',
    value: function manualRouteTo(iPath, iTarget, iViewUrl, iJSModuleUrl) {
      var vm = this.vm;
      var template = { Id: 'manual', Target: iTarget, ViewUrl: iViewUrl, JSModuleUrl: iJSModuleUrl };
      this.routeTo(iPath, template, true);
    }

    // Handles route enter event.

  }, {
    key: 'onRouteEnter',
    value: function onRouteEnter(iPath, iTemplate) {
      return true;
    }

    // Raise event indicating the routing process has ended.

  }, {
    key: 'raiseRoutedEvent',
    value: function raiseRoutedEvent(force) {
      var vm = this.vm;
      if (this.router.urlPath == '' || force == true) {
        if (this.debug) console.log('router> routed');
        _utils2.default.dispatchEvent('dotnetify.routed');
      }
    }

    // Returns the URL for an anchor tag.

  }, {
    key: 'route',
    value: function route(iRoute, iTarget) {
      // No route to process. Return silently.
      if (iRoute == null) return;

      if (!iRoute.hasOwnProperty('Path') || !iRoute.hasOwnProperty('TemplateId')) throw new Error('Not a valid route');

      // Build the absolute root path.
      this.initRoot();

      // If the route path is not defined, use the URL pattern from the associated template.
      // This is so that we don't send the same data twice if both are equal.
      var path = iRoute.Path;
      var template = null;
      if (this.hasRoutingState && this.RoutingState.Templates != null) {
        var match = this.RoutingState.Templates.filter(function (iTemplate) {
          return iTemplate.Id == iRoute.TemplateId;
        });
        if (match.length > 0) {
          template = match[0];

          if (typeof iTarget === 'string') template.Target = iTarget;

          if (path == null) {
            path = template.UrlPattern != null ? template.UrlPattern : template.Id;
            iRoute.Path = path;
          }
        } else if (iRoute.RedirectRoot == null) throw new Error("vmRoute cannot find route template '" + iRoute.TemplateId);
      }

      // If the path has a redirect root, the path doesn't belong to the current root and needs to be
      // redirected to a different one.  Set the absolute path to the HREF attribute, and prevent the
      // default behavior of the anchor click event and instead do push to HTML5 history state, which
      // would attempt to resolve the path first before resorting to hard browser redirect.
      if (iRoute.RedirectRoot != null) {
        // Combine the redirect root with the view model's root.
        var redirectRoot = iRoute.RedirectRoot;
        if (redirectRoot.charAt(0) == '/') redirectRoot = redirectRoot.substr(0, redirectRoot.length - 1);
        var redirectRootPath = iRoute.RedirectRoot.split('/');

        var urlRedirect = '';
        var absRoot = this.VMRoot;
        if (absRoot != null) {
          var absRootPath = absRoot.split('/');
          for (var i = 0; i < absRootPath.length; i++) {
            if (absRootPath[i] != '' && absRootPath[i] == redirectRootPath[0]) break;
            urlRedirect += absRootPath[i] + '/';
          }
        }
        urlRedirect += redirectRoot + '/' + path;
        this.routes.push({ Path: path, Url: urlRedirect });
        return urlRedirect;
      }

      // For quick lookup, save the mapping between the path to the route inside the view model.
      if (template == null) throw new Error('vmRoute cannot find any route template');

      iRoute.$template = template;
      this.pathToRoute = this.pathToRoute || {};
      this.pathToRoute[path] = iRoute;

      // Set the absolute path to the HREF attribute, and prevent the default behavior of
      // the anchor click event and instead do push to HTML5 history state.
      var url = this.toUrl(path);
      url = url.length > 0 ? url : '/';
      this.routes.push({ Path: path, Url: url });
      return url;
    }

    // Routes to a path.

  }, {
    key: 'routeTo',
    value: function routeTo(iPath, iTemplate, iDisableEvent, iCallbackFn, isRedirect) {
      var _this3 = this;

      var vm = this.vm;
      var viewModels = vm.$dotnetify.getViewModels();

      if (this.debug) console.log("router> route '" + iPath + "' to template id=" + iTemplate.Id);

      // We can determine whether the view has already been loaded by matching the 'RoutingState.Origin' argument
      // on the existing view model inside that target selector with the path.
      for (var i = 0; i < viewModels.length; i++) {
        var vmOther = viewModels[i];
        var vmArg = vmOther.$router.VMArg;
        if (vmArg != null) {
          if (typeof vmArg['RoutingState.Origin'] === 'string' && _utils2.default.equal(vmArg['RoutingState.Origin'], iPath)) return;
        }
      }

      // Support enter interception.
      if (iDisableEvent != true && vm.hasOwnProperty('onRouteEnter')) {
        if (this.onRouteEnter(iPath, iTemplate) == false || vm.onRouteEnter(iPath, iTemplate) == false) return;
      }

      // Check if the route has valid target.
      if (iTemplate.Target === null) {
        console.error("router> the Target for template '" + iTemplate.Id + "' was not set.  Use vm.onRouteEnter() to set the target.");
        return;
      }

      // If target DOM element isn't found, redirect URL to the path.
      if (document.getElementById(iTemplate.Target) == null) {
        if (isRedirect === true) {
          if (this.debug) console.log("router> target '" + iTemplate.Target + "' not found in DOM");
          return;
        } else {
          if (this.debug) console.log("router> target '" + iTemplate.Target + "' not found in DOM, use redirect instead");
          return this.router.redirect(this.toUrl(iPath), viewModels);
        }
      }

      // Load the view associated with the route asynchronously.
      this.loadView('#' + iTemplate.Target, iTemplate.ViewUrl, iTemplate.JSModuleUrl, { 'RoutingState.Origin': iPath }, function () {
        // If load is successful, update the active route.
        _this3.dispatchActiveRoutingState(iPath);

        // Support exit interception.
        if (iDisableEvent != true && vm.hasOwnProperty('onRouteExit')) vm.onRouteExit(iPath, iTemplate);

        if (typeof iCallbackFn === 'function') iCallbackFn.call(vm);
      });
    }
  }, {
    key: 'routeToRoute',
    value: function routeToRoute(iRoute) {
      var _this4 = this;

      var path = this.vm.$route(iRoute);
      if (path == null || path == '') throw new Error('The route passed to $routeTo is invalid.');

      setTimeout(function () {
        return _this4.router.pushState({}, '', path);
      });
    }

    // Routes the URL if the view model implements IRoutable.
    // Returns true if the view model handles the routing.

  }, {
    key: 'routeUrl',
    value: function routeUrl(isRedirect) {
      var _this5 = this;

      if (!this.hasRoutingState) return false;

      var root = this.RoutingState.Root;
      if (root == null) return false;

      // Get the URL path to route.
      var urlPath = this.router.urlPath;

      if (this.debug) console.log('router> routing ' + urlPath);

      // If the URL path matches the root path of this view, use the template with a blank URL pattern if provided.
      if (_utils2.default.equal(urlPath, root) || _utils2.default.equal(urlPath, root + '/') || urlPath === '/') {
        var match = _utils2.default.grep(this.RoutingState.Templates, function (iTemplate) {
          return iTemplate.UrlPattern === '';
        });
        if (match.length > 0) {
          this.routeTo('', match[0], null, null, isRedirect);
          this.router.urlPath = '';
          this.raiseRoutedEvent();
          return true;
        }
        return false;
      }

      // If the URL path starts with the root path of this view, look at the next path and try to match it with the
      // anchor tags in this view that are bound with the vmRoute binding type.  If there is match, route to that path.
      root = root + '/';
      if (_utils2.default.startsWith(urlPath, root)) {
        var routeElem = null;
        var match = _utils2.default.grep(this.routes, function (elem) {
          return _utils2.default.startsWith(urlPath + '/', elem.Url + '/');
        });
        if (match.length > 0) {
          // If more than one match, find the best match.
          for (var i = 0; i < match.length; i++) {
            if (routeElem == null || routeElem.Url.length < match[i].Url.length) routeElem = match[i];
          }
        }

        if (routeElem != null) {
          var path = routeElem.Path;
          var template = this.hasOwnProperty('pathToRoute') && this.pathToRoute.hasOwnProperty(path) ? this.pathToRoute[path].$template : null;
          if (template != null) {
            // If the URL path is completely routed, clear it.
            if (_utils2.default.equal(this.router.urlPath, this.toUrl(path))) this.router.urlPath = '';

            // If route's not already active, route to it.
            if (!_utils2.default.equal(this.RoutingState.Active, path)) {
              this.routeTo(path, template, false, function () {
                return _this5.raiseRoutedEvent();
              }, isRedirect);
            } else this.raiseRoutedEvent();
            return true;
          }
        } else if (this.router.match(urlPath)) {
          // If no vmRoute binding matches, try to match with any template's URL pattern.
          this.router.urlPath = '';
          this.raiseRoutedEvent();
          return true;
        }
      }
      return false;
    }

    // Builds an absolute URL from a path.

  }, {
    key: 'toUrl',
    value: function toUrl(iPath) {
      var path = _utils2.default.trim(iPath);
      if (path.charAt(0) != '(' && path != '') path = '/' + path;
      return this.hasRoutingState ? this.RoutingState.Root + path : iPath;
    }
  }]);

  return dotnetifyVMRouter;
}();

exports.default = dotnetifyVMRouter;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__22__;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(22);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dotnetifyVmRouter = __webpack_require__(21);

var _dotnetifyVmRouter2 = _interopRequireDefault(_dotnetifyVmRouter);

var _jqueryShim = __webpack_require__(1);

var _jqueryShim2 = _interopRequireDefault(_jqueryShim);

var _utils = __webpack_require__(3);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var dotnetifyReactVMRouter = function (_dotnetifyVMRouter) {
  _inherits(dotnetifyReactVMRouter, _dotnetifyVMRouter);

  _createClass(dotnetifyReactVMRouter, [{
    key: 'hasRoutingState',
    get: function get() {
      var state = this.vm.State();
      return state && state.hasOwnProperty('RoutingState');
    }
  }, {
    key: 'RoutingState',
    get: function get() {
      return this.vm.State().RoutingState;
    }
  }, {
    key: 'VMRoot',
    get: function get() {
      return this.vm.Props('vmRoot');
    }
  }, {
    key: 'VMArg',
    get: function get() {
      return this.vm.Props('vmArg');
    }
  }]);

  function dotnetifyReactVMRouter(iVM, iDotNetifyRouter) {
    _classCallCheck(this, dotnetifyReactVMRouter);

    return _possibleConstructorReturn(this, (dotnetifyReactVMRouter.__proto__ || Object.getPrototypeOf(dotnetifyReactVMRouter)).call(this, iVM, iDotNetifyRouter));
  }

  _createClass(dotnetifyReactVMRouter, [{
    key: 'onRouteEnter',
    value: function onRouteEnter(iPath, iTemplate) {
      if (!iTemplate.ViewUrl) iTemplate.ViewUrl = iTemplate.Id;
      return true;
    }

    // Loads a view into a target element.

  }, {
    key: 'loadView',
    value: function loadView(iTargetSelector, iViewUrl, iJsModuleUrl, iVmArg, iCallbackFn) {
      var vm = this.vm;
      var reactProps = void 0;

      // If the view model supports routing, add the root path to the view, to be used
      // to build the absolute route path, and view model argument if provided.
      if (this.hasRoutingState) {
        if (this.RoutingState === null) {
          console.error("router> the RoutingState prop of '" + vm.$vmId + "' was not initialized.");
          return;
        }

        var root = this.VMRoot;
        root = root != null ? '/' + _utils2.default.trim(this.RoutingState.Root) + '/' + _utils2.default.trim(root) : this.RoutingState.Root;
        reactProps = { vmRoot: root, vmArg: iVmArg };
      }

      // Provide the opportunity to override the URL.
      iViewUrl = this.router.overrideUrl(iViewUrl, iTargetSelector);
      iJsModuleUrl = this.router.overrideUrl(iJsModuleUrl, iTargetSelector);

      if (_utils2.default.endsWith(iViewUrl, 'html')) this.loadHtmlView(iTargetSelector, iViewUrl, iJsModuleUrl, iCallbackFn);else this.loadReactView(iTargetSelector, iViewUrl, iJsModuleUrl, reactProps, iCallbackFn);
    }

    // Loads an HTML view.

  }, {
    key: 'loadHtmlView',
    value: function loadHtmlView(iTargetSelector, iViewUrl, iJsModuleUrl, callbackFn) {
      var vm = this.vm;

      try {
        // Unmount any React component before replacing with a new DOM.
        _reactDom2.default.unmountComponentAtNode(document.querySelector(iTargetSelector));
      } catch (e) {
        console.error(e);
      }

      // Load the HTML view.
      (0, _jqueryShim2.default)(iTargetSelector).load(iViewUrl, null, function () {
        if (iJsModuleUrl != null) {
          _jqueryShim2.default.getScript(iJsModuleUrl, function () {
            if (typeof callbackFn === 'function') callbackFn.call(vm);
          });
        } else if (typeof callbackFn === 'function') callbackFn.call(vm);
      });
    }

    // Loads a React view.

  }, {
    key: 'loadReactView',
    value: function loadReactView(iTargetSelector, iReactClassOrClassName, iJsModuleUrl, iReactProps, callbackFn) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var vm = _this2.vm;
        var vmId = _this2.vm ? _this2.vm.$vmId : '';
        var createViewFunc = function createViewFunc() {
          // Resolve the vue class from the argument, which can be the object itself, or a global window variable name.
          var reactClass = null;
          if (typeof iReactClassOrClassName === 'string' && window.hasOwnProperty(iReactClassOrClassName)) reactClass = window[iReactClassOrClassName];else if ((typeof iReactClassOrClassName === 'undefined' ? 'undefined' : _typeof(iReactClassOrClassName)) === 'object' && iReactClassOrClassName.name) reactClass = iReactClassOrClassName;

          if (!reactClass) {
            console.error('[' + vmId + '] failed to load view \'' + iReactClassOrClassName + '\' because it\'s not a React element.');
            reject();
            return;
          }

          try {
            _reactDom2.default.unmountComponentAtNode(document.querySelector(iTargetSelector));
          } catch (e) {
            console.error(e);
          }

          try {
            var reactElement = _react2.default.createElement(reactClass, iReactProps);
            _reactDom2.default.render(reactElement, document.querySelector(iTargetSelector));
          } catch (e) {
            console.error(e);
          }
          if (typeof callbackFn === 'function') callbackFn.call(vm, reactElement);
          resolve(reactElement);
        };

        if (iJsModuleUrl == null || dotnetify.ssr === true) createViewFunc();else {
          // Load all javascripts first. Multiple files can be specified with comma delimiter.
          var getScripts = iJsModuleUrl.split(',').map(function (i) {
            return _jqueryShim2.default.getScript(i);
          });
          _jqueryShim2.default.when.apply(_jqueryShim2.default, getScripts).done(createViewFunc);
        }
      });
    }
  }]);

  return dotnetifyReactVMRouter;
}(_dotnetifyVmRouter2.default);

exports.default = dotnetifyReactVMRouter;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
PathJS - Copyright (c) 2011 Mike Trpcic, released under the MIT license.
 */

var Path = {
	// Need this specific version, because latest version is causing issue.
	version: '0.8.5',
	map: function map(path) {
		if (Path.routes.defined.hasOwnProperty(path)) {
			return Path.routes.defined[path];
		} else {
			return new Path.core.route(path);
		}
	},
	root: function root(path) {
		Path.routes.root = path;
	},
	rescue: function rescue(fn) {
		Path.routes.rescue = fn;
	},
	history: {
		initial: {}, // Empty container for "Initial Popstate" checking variables.
		pushState: function pushState(state, title, path) {
			if (Path.history.supported) {
				if (Path.dispatch(path)) {
					history.pushState(state, title, path);
				}
			} else {
				if (Path.history.fallback) {
					window.location.hash = '#' + path;
				}
			}
		},
		popState: function popState(event) {
			var initialPop = !Path.history.initial.popped && location.href == Path.history.initial.URL;
			Path.history.initial.popped = true;
			if (initialPop) return;
			Path.dispatch(document.location.pathname === '/' ? '' : document.location.pathname);
		},
		listen: function listen(fallback) {
			Path.history.supported = !!(window.history && window.history.pushState);
			Path.history.fallback = fallback;

			if (Path.history.supported) {
				Path.history.initial.popped = 'state' in window.history, Path.history.initial.URL = location.href;
				window.onpopstate = Path.history.popState;
			} else {
				if (Path.history.fallback) {
					for (route in Path.routes.defined) {
						if (route.charAt(0) != '#') {
							Path.routes.defined['#' + route] = Path.routes.defined[route];
							Path.routes.defined['#' + route].path = '#' + route;
						}
					}
					Path.listen();
				}
			}
		}
	},
	match: function match(path, parameterize) {
		var params = {},
		    route = null,
		    possible_routes,
		    slice,
		    i,
		    j,
		    compare,
		    result;
		for (route in Path.routes.defined) {
			if (route !== null && route !== undefined) {
				route = Path.routes.defined[route];
				possible_routes = route.partition();
				for (j = 0; j < possible_routes.length; j++) {
					slice = possible_routes[j];
					compare = path;
					if (slice.search(/:/) > 0) {
						for (i = 0; i < slice.split('/').length; i++) {
							if (i < compare.split('/').length && slice.split('/')[i].charAt(0) === ':') {
								params[slice.split('/')[i].replace(/:/, '')] = compare.split('/')[i];
								result = compare.split('/');
								result[i] = slice.split('/')[i];
								compare = result.join('/');
							}
						}
					}
					if (slice === compare) {
						if (parameterize) {
							route.params = params;
						}
						return route;
					}
				}
			}
		}
		return null;
	},
	dispatch: function dispatch(passed_route) {
		var previous_route, matched_route;
		if (Path.routes.current !== passed_route) {
			Path.routes.previous = Path.routes.current;
			Path.routes.current = passed_route;
			matched_route = Path.match(passed_route, true);

			if (Path.routes.previous) {
				previous_route = Path.match(Path.routes.previous);
				if (previous_route !== null && previous_route.do_exit !== null) {
					previous_route.do_exit();
				}
			}

			if (matched_route !== null) {
				matched_route.run();
				return true;
			} else {
				if (Path.routes.rescue !== null) {
					Path.routes.rescue();
				}
			}
		}
	},
	listen: function listen() {
		var fn = function fn() {
			Path.dispatch(location.hash);
		};

		if (location.hash === '') {
			if (Path.routes.root !== null) {
				location.hash = Path.routes.root;
			}
		}

		// The 'document.documentMode' checks below ensure that PathJS fires the right events
		// even in IE "Quirks Mode".
		if ('onhashchange' in window && (!document.documentMode || document.documentMode >= 8)) {
			window.onhashchange = fn;
		} else {
			setInterval(fn, 50);
		}

		if (location.hash !== '') {
			Path.dispatch(location.hash);
		}
	},
	core: {
		route: function route(path) {
			this.path = path;
			this.action = null;
			this.do_enter = [];
			this.do_exit = null;
			this.params = {};
			Path.routes.defined[path] = this;
		}
	},
	routes: {
		current: null,
		root: null,
		rescue: null,
		previous: null,
		defined: {}
	}
};

Path.core.route.prototype = {
	to: function to(fn) {
		this.action = fn;
		return this;
	},
	enter: function enter(fns) {
		if (fns instanceof Array) {
			this.do_enter = this.do_enter.concat(fns);
		} else {
			this.do_enter.push(fns);
		}
		return this;
	},
	exit: function exit(fn) {
		this.do_exit = fn;
		return this;
	},
	partition: function partition() {
		var parts = [],
		    options = [],
		    re = /\(([^}]+?)\)/g,
		    text,
		    i;
		while (text = re.exec(this.path)) {
			parts.push(text[1]);
		}
		options.push(this.path.split('(')[0]);
		for (i = 0; i < parts.length; i++) {
			options.push(options[options.length - 1] + parts[i]);
		}
		return options;
	},
	run: function run() {
		var halt_execution = false,
		    i,
		    result,
		    previous;

		if (Path.routes.defined[this.path].hasOwnProperty('do_enter')) {
			if (Path.routes.defined[this.path].do_enter.length > 0) {
				for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
					result = Path.routes.defined[this.path].do_enter[i].apply(this, null);
					if (result === false) {
						halt_execution = true;
						break;
					}
				}
			}
		}
		if (!halt_execution) {
			Path.routes.defined[this.path].action();
		}
	}
};

exports.default = Path;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Copyright 2017-2018 Dicky Suryadi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _path = __webpack_require__(24);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dotnetifyRouter = function () {
  function dotnetifyRouter(debug) {
    _classCallCheck(this, dotnetifyRouter);

    this.version = '2.0.1';
    this.urlPath = document.location.pathname;

    this.debug = debug;
  }

  // Initialize routing using PathJS.


  // URL path that will be parsed when performing routing.


  _createClass(dotnetifyRouter, [{
    key: 'init',
    value: function init() {
      if (typeof _path2.default !== 'undefined') {
        _path2.default.history.listen(true);
        _path2.default.routes.rescue = function () {
          //window.location.replace(document.location.pathname);
        };
      } else throw new Error('Pathjs library is required for routing.');
    }

    // Map a route to an action.

  }, {
    key: 'mapTo',
    value: function mapTo(iPath, iFn) {
      iPath = iPath.length > 0 ? iPath : '/';
      if (typeof _path2.default !== 'undefined') _path2.default.map(iPath).to(function () {
        iFn(this.params);
      });
    }

    // Match a URL path to a route and run the action.

  }, {
    key: 'match',
    value: function match(iUrlPath) {
      if (typeof _path2.default !== 'undefined') {
        var matched = _path2.default.match(iUrlPath, true);
        if (matched != null) {
          matched.run();
          return true;
        }
      }
      return false;
    }

    // Optional callback to override a URL before performing routing.

  }, {
    key: 'overrideUrl',
    value: function overrideUrl(iUrl) {
      return iUrl;
    }

    // Push state to HTML history.

  }, {
    key: 'pushState',
    value: function pushState(iState, iTitle, iPath) {
      this.urlPath = '';
      if (typeof _path2.default !== 'undefined') _path2.default.history.pushState(iState, iTitle, iPath);
    }

    // Redirect to the a URL.

  }, {
    key: 'redirect',
    value: function redirect(iUrl, viewModels) {
      // Check first whether existing views can handle routing this URL.
      // Otherwise, do a hard browser redirect.
      this.urlPath = iUrl;
      for (var i = 0; i < viewModels.length; i++) {
        var vm = viewModels[i];
        if (vm.$router.routeUrl(true)) {
          if (this.debug) console.log('router> redirected');
          return;
        }
      }
      window.location.replace(iUrl);
    }

    // Called by dotNetify when a view model is ready.

  }, {
    key: '$ready',
    value: function $ready() {
      this.$router.initRouting();
    }
  }]);

  return dotnetifyRouter;
}();

exports.default = dotnetifyRouter;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

var _dotnetifyRouter = __webpack_require__(25);

var _dotnetifyRouter2 = _interopRequireDefault(_dotnetifyRouter);

var _dotnetifyReact3 = __webpack_require__(23);

var _dotnetifyReact4 = _interopRequireDefault(_dotnetifyReact3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add plugin functions.
_dotnetifyReact2.default.react.router = new _dotnetifyRouter2.default(_dotnetifyReact2.default.debug);

// Inject a view model with functions.
/* 
Copyright 2017 Dicky Suryadi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
_dotnetifyReact2.default.react.router.$inject = function (iVM) {
  var router = new _dotnetifyReact4.default(iVM, _dotnetifyReact2.default.react.router);

  // Put functions inside $router namespace.
  iVM.$router = router;

  // Returns the URL for an anchor tag.
  iVM.$route = function (iRoute, iTarget) {
    return router.route(iRoute, iTarget);
  };

  // Handles click event from anchor tags.
  iVM.$handleRoute = function (iEvent) {
    return router.handleRoute(iEvent);
  };

  // Executes the given route.
  iVM.$routeTo = function (iRoute) {
    return router.routeToRoute(iRoute);
  };
};

// Provide function to load a view.
_dotnetifyReact2.default.react.router.$mount = function (iTargetSelector, iComponent, iProps, iCallbackFn) {
  return _dotnetifyReact4.default.prototype.loadReactView(iTargetSelector, iComponent, null, iProps, iCallbackFn);
};

// Register the plugin to dotNetify.
_dotnetifyReact2.default.react.plugins['router'] = _dotnetifyReact2.default.react.router;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dotnetifyReact = __webpack_require__(0);

var _dotnetifyReact2 = _interopRequireDefault(_dotnetifyReact);

__webpack_require__(26);

__webpack_require__(20);

var _Scope = __webpack_require__(19);

var _Scope2 = _interopRequireDefault(_Scope);

var _RouteLink = __webpack_require__(15);

var _RouteLink2 = _interopRequireDefault(_RouteLink);

var _RouteTarget = __webpack_require__(14);

var _RouteTarget2 = _interopRequireDefault(_RouteTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Object.assign(_dotnetifyReact2.default, { Scope: _Scope2.default, RouteLink: _RouteLink2.default, RouteTarget: _RouteTarget2.default });

/***/ })
/******/ ]);
});
//# sourceMappingURL=dotnetify-react.js.map