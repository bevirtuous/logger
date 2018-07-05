(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './logger', './group'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./logger'), require('./group'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.logger, global.group);
    global.index = mod.exports;
  }
})(this, function (exports, _logger, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'logger', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_logger).default;
    }
  });
  Object.defineProperty(exports, 'group', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_group).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});