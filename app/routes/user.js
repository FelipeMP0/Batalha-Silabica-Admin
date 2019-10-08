module.exports = (server) => {
  server.get('/register', (req, res) => {
    server.app.controllers.user.registration(server, req, res);
  });

  server.post('/register', (req, res) => {
    server.app.controllers.user.register(server, req, res);
  });
};
