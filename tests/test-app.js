'use strict';

var express = require('express');
var Bluebird = require('bluebird');
var Router = require('../');
var router = new Router();
var app = express();

// Resolved
router.get('/api/users', function * allUsersRoute(req, res) {
  var results = yield mockModel(['John', 'Betty', 'Hal']);
  res.json(results);
});

// Rejected
router.post('/api/users', function * allUsersRoute(req, res) {
  var results = yield mockModel(['John', 'Betty', 'Hal'], 'error');
  res.json(results);
});


// Resolved
router.get('/api/async/users', async function allUsersRoute(req, res) {
  var results = await mockModel(['John', 'Betty', 'Hal']);
  res.json(results);
});

// Rejected
router.post('/api/async/users', async function allUsersRoute(req, res) {
  var results = await mockModel(['John', 'Betty', 'Hal'], 'error');
  res.json(results);
});

// Resolved
router.get('/api/comments', function allCommentsRoute(req, res) {
  mockModel(['hello', 'goodbye']).then(function (results) {
    res.json(results);
  });
});

router.route('/api/posts')
  // Resolved
  .get(function * allPostsRoute(req, res) {
    var results = yield mockModel(['a', 'b']);
    res.json(results);
  })
  // Rejected
  .post(function * createPostRoute(req, res) {
    var results = yield mockModel(['a', 'b'], 'error');
    res.json(results);
  });

router.use(function (error, req, res, next) {
  res.status(400).json(error);
});

app.use(router);

module.exports = app;

function mockModel(data, err) {
  return new Bluebird(function (resolve, reject) {
    process.nextTick(function () {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
