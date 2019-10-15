module.exports = (server) => {
  server.get('/categories/:id/words', (req, res) => {
    server.controllers.word.list(server, req, res);
  });

  server.get('/categories/:id/create-word', (req, res) => {
    server.controllers.word.createForm(server, req, res);
  });

  server.post('/categories/:id/create-word', (req, res) => {
    server.controllers.word.create(server, req, res);
  });

  server.get('/categories/:id/delete-word/:wordId', (req, res) => {
    server.controllers.word.delete(server, req, res);
  });
};
