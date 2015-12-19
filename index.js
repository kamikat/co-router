
var wrapCo = require('co-express');
var express = require('express');
var methods = require('methods');

var transform = function (args, offset) {
  return Array.prototype.slice.call(args, offset || 0).map((fn) => {
    if (fn && fn.constructor.name === 'GeneratorFunction') {
      return wrapCo(fn);
    }
    return fn;
  });
}

module.exports = function () {
  var router = express.Router();

  methods.concat('all').forEach((method) => {
    var route = router[method];
    router[method] = function (path) {
      return route.apply(this, [ path ].concat(transform(arguments, 1)));
    };
  });

  var use = router.use;
  router.use = function (path) {
    if (typeof path === 'function') {
      use.apply(this, transform(arguments));
    } else {
      use.apply(this, [ path ].concat(transform(arguments, 1)));
    }
  }

  return router;
}

