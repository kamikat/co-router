co-router
---------

Benefit from generators on express router.

[![Build Status](https://travis-ci.org/kamikat/co-router.svg?branch=master)](https://travis-ci.org/kamikat/co-router)
[![npm version](https://badge.fury.io/js/co-router.svg)](https://badge.fury.io/js/co-router)

### Installation ###

```sh
$ npm install co-router
```

Or, save to dependency:

```sh
$ npm install --save co-router
```

### Usage ###

```js
var Router = require('co-router');
var router = Router();

router.get('/route', function (req, res, next) {
  var rows = db.query('SELECT 1 + 1', function (err, rows) {
    if (err) {
      return next(err);
    }
    return res.send(rows);
  });
});

// Use a generator function as route handler
router.get('/route/co', function* (req, res, next) {
  var rows = yield db.query('SELECT 1 + 1');
  // Uncaught error (reject) is handled with `next(err)`.
  return res.send(rows);
});

// Compatible with legacy route handler, useful when reuse express middlewares
router.get('/route/together', function (req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect(301, '/login.html');
  }
}, function* (req, res, next) {
  return res.send(yield Promise.resolve("Hello world"));
});

// Chaining routes
router.route('/foo')
  .get(function* (req, res, next) {
    // Do something...
  })
  .post(function* (req, res, next) {
    // Do something...
  });

// Middleware
router.use(function* (req, res, next) {
  // Do something...
});

// Error handler
router.use(function* (err, req, res, next) {
  // Do something...
});
```

License
-------

(The MIT License)

