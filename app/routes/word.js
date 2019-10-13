module.exports = (server) => {
  server.get('/categories/:id/words', (req, res) => {
    server.app.controllers.word.list(server, req, res);
  });

  server.get('/categories/:id/create-word', (req, res) => {
    server.app.controllers.word.createForm(server, req, res);
  });

  server.post('/categories/:id/create-word', (req, res) => {
    server.app.controllers.word.create(server, req, res);
  });
};
