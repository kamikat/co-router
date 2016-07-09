'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('./test-app');

test('Basic valid route with generator', function (t) {
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

test('Basic errored route with generator', function (t) {
  request(app)
    .post('/api/users')
    .expect('Content-Type', /json/)
    .expect(400)
    .end(function (err, res) {
      var expected = 'error';

      t.same(res.body, expected, 'Has error');
      t.end();
    });
});

test('Basic valid route', function (t) {
  request(app)
    .get('/api/comments')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expected = ['hello', 'goodbye'];

      t.error(err, 'No error');
      t.same(res.body, expected, 'Comments as expected');
      t.end();
    });
});

test('Routed router setup', function (t) {
  request(app)
    .get('/api/posts')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expected = ['a', 'b'];

      t.error(err, 'No error');
      t.same(res.body, expected, 'Posts as expected');
      t.end();
    });
});

test('Routed router setup rejected', function (t) {
  request(app)
    .post('/api/posts')
    .expect('Content-Type', /json/)
    .expect(400)
    .end(function (err, res) {
      var expected = 'error';

      t.same(res.body, expected, 'Has error');
      t.end();
    });
});

// Hack to get it to process.exit
// Probably due to dangling setInterval or promises
test('end', function (t) {
  t.end();
  process.nextTick(function () {
    process.exit();
  });
});
