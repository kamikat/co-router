'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('./test-app');

test('Basic valid route', function (t) {
  request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expectedUsers = ['John', 'Betty', 'Hal'];

      t.error(err, 'No error');
      t.same(res.body, expectedUsers, 'Users as expected');
      t.end();
    });
});

test('Routed router setup', function (t) {
  request(app)
    .get('/api/posts')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expectedPosts = ['a', 'b'];

      t.error(err, 'No error');
      t.same(res.body, expectedUsers, 'Posts as expected');
      t.end();
    });
});
