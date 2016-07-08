'use strict';

var express = require('express');
var Bluebird = require('bluebird');
var Router = require('../');
var router = new Router();
var app = express();

router.get('/api/users', function * allUsersRoute(req, res) {
  var results = yield mockModel(['John', 'Betty', 'Hal']);
  res.json(results);
});

router.route('/api/posts')
  .get(function * allPostsRoute(req, res) {
    var results = yield mockModel(['a', 'b']);
    res.json(results);
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
