co-router
---------

Benefit from generator on express router.

### Installation ###

```shell
$ npm install co-router
```

Or, save to dependency:

```shell
$ npm install --save co-router
```

### Usage ###

```js
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
```

License
-------

(The MIT License)

