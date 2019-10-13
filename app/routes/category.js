module.exports = (server) => {
  server.get('/categories', (req, res) => {
    server.app.controllers.category.list(server, req, res);
  });

  server.get('/create-category', (req, res) => {
    server.app.controllers.category.createForm(server, req, res);
  });

  server.post('/create-category', (req, res) => {
    server.app.controllers.category.create(server, req, res);
  });
};
