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

  server.get('/update-category/:id', (req, res) => {
    server.controllers.category.updateForm(server, req, res);
  });

  server.post('/update-category/:id', (req, res) => {
    server.controllers.category.update(server, req, res);
  });

  server.get('/delete-category/:id', (req, res) => {
    server.controllers.category.delete(server, req, res);
  });
};
