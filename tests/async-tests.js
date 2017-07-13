
module.exports = function (router, mockModel) {
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
}
