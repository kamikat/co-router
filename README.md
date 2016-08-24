co-router
---------

[![Travis branch](https://img.shields.io/travis/kamikat/co-router/master.svg?maxAge=2592000)](https://travis-ci.org/kamikat/co-router)
[![Coverage Status](https://coveralls.io/repos/github/kamikat/co-router/badge.svg?branch=master)](https://coveralls.io/github/kamikat/co-router?branch=master)
[![npm](https://img.shields.io/npm/v/co-router.svg?maxAge=2592000)](https://www.npmjs.com/package/co-router)

Benefit from generators with express router.

### Installation ###

```sh
$ npm install --save co-router
```

### Usage ###

```js
var Router = require('co-router');
var router = Router();

// Express.js route handler

router.get('/foo', function (req, res, next) {
    var rows = db.query('SELECT 1 + 1', function (err, rows) {
        if (err) {
            return next(err);
        }
        return res.send(rows);
    });
});

// Use a generator function as route handler

router.get('/bar', function* (req, res, next) {
    var rows = yield db.query('SELECT 1 + 1');
    // Uncaught error (reject) is handled with `next(err)`.
    return res.send(rows);
});

// Compatible with legacy route handler, helpful to reuse express middlewares

router.post('/baz', function (req, res, next) {
    if (req.session.authenticated) {
        return next();
    } else {
        return res.redirect(301, '/login.html');
    }
}, function* (req, res, next) {
    return res.send(yield Promise.resolve("Hello world"));
});

// Chaining routes

router.route('/baz')
    .get(function* (req, res, next) {
        // Do something...
    })
    .put(function* (req, res, next) {
        // Do something...
    });

// Generator in middleware

router.use(function* (req, res, next) {
    // Do something
});

// And error handler

router.use(function* (err, req, res, next) {
    // Handle error
});
```

License
-------

(The MIT License)

