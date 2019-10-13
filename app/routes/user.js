module.exports = (server) => {
  server.get('/register', (req, res) => {
    server.app.controllers.user.registration(server, req, res);
  });

  server.post('/register', (req, res) => {
    server.app.controllers.user.register(server, req, res);
  });

  server.get('/login', (req, res) => {
    server.app.controllers.user.login(server, req, res);
  });

  server.post('/authenticate', (req, res) => {
    server.app.controllers.user.authenticate(server, req, res);
  })
};
