module.exports = (server) => {
  server.get('/login', (req, res) => {
    server.app.controllers.login.login(server, req, res);
  });

  server.post('/authenticate', (req, res) => {
    server.app.controllers.login.authenticate(server, req, res);
  });

  server.get('/logout', (req, res) => {
  });
};
