module.exports = (server) => {
  server.get('/categories', (req, res) => {
    server.controllers.category.list(server, req, res);
  });

  server.get('/create-category', (req, res) => {
    server.controllers.category.createForm(server, req, res);
  });

  server.post('/create-category', (req, res) => {
    server.controllers.category.create(server, req, res);
  });
};
