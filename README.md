co-router
---------

Benefit from generators on express router.

[![NPM][npm-badge-img]][npm-badge-link] [![Build Status][travis-badge]][travis-badge-link]

### Installation ###

    $ npm install co-router

Or, save to dependency:

    $ npm install --save co-router

### Usage ###

    var Router = require('co-router');
    var router = Router();

    router.get('/route', function (req, res, next) {
      var rows = db.query('SELECT 1 + 1', function (err, rows) {
        if (err) next(err);
        return res.send(rows);
      });
    });

    router.get('/route/co', function* (req, res, next) {
      var rows = yield db.query('SELECT 1 + 1');
      // Uncaught error (reject) is handled with `next(err)` automatically.
      // Do something...
    });

    router.get('/route/together', function (req, res, next) {
      // Do something...
    }, function* (req, res, next) {
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

License
-------

(The MIT License)

[npm-badge-img]: https://badge.fury.io/js/co-router.svg
[npm-badge-link]: http://badge.fury.io/js/co-router
[travis-badge]: https://travis-ci.org/kamikat/co-router.svg?branch=master
[travis-badge-link]: https://travis-ci.org/kamikat/co-router
