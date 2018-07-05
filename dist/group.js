(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './logger'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./logger'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.logger);
    global.group = mod.exports;
  }
})(this, function (exports, _logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = group;

  var _logger2 = _interopRequireDefault(_logger);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var KEY_COLOR = 'gray';
  var FONT_WEIGHT_NORMAL = 'lighter';
  var FONT_WEIGHT_BOLD = 'bold';

  var defaultStyles = {
    color: KEY_COLOR,
    weight: FONT_WEIGHT_NORMAL
  };

  function repeat(str, times) {
    return new Array(times + 1).join(str);
  }

  function pad(num, maxLength) {
    return repeat('0', maxLength - num.toString().length) + num;
  }

  function getFormattedTime() {
    var time = new Date();
    var hours = pad(time.getHours(), 2);
    var minutes = pad(time.getMinutes(), 2);
    var seconds = pad(time.getSeconds(), 2);
    var milliseconds = pad(time.getMilliseconds(), 3);

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }

  function maxKeysLength(prop) {
    var maxLength = 0;

    Object.keys(prop).forEach(function (key) {
      if (key.length + 1 > maxLength) {
        maxLength = key.length + 1;
      }
    });

    return maxLength;
  }

  function style() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStyles,
        color = _ref.color,
        weight = _ref.weight;

    return 'color: ' + color + '; font-weight: ' + weight + ';';
  }

  function group(title) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'inherit';

    var time = getFormattedTime();

    _logger2.default.groupCollapsed(' %c' + title + ' %c@ ' + time, style(color), style('inherit', FONT_WEIGHT_BOLD), style());

    if (Object.keys(content).length) {
      var maxLength = maxKeysLength(content) + 2;

      Object.keys(content).forEach(function (key) {
        var value = content[key];
        var action = (key + ':').padEnd(maxLength);

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null && value.constructor === Object) {
          if (!Object.keys(value).length) {
            _logger2.default.log(' %c ' + action, style(KEY_COLOR, FONT_WEIGHT_BOLD), undefined);
          } else {
            _logger2.default.log(' %c ' + action, style(KEY_COLOR, FONT_WEIGHT_BOLD), value);
          }
        } else {
          _logger2.default.log(' %c ' + action, style(KEY_COLOR, FONT_WEIGHT_BOLD), value);
        }
      });
    }

    _logger2.default.groupEnd();
  }
});