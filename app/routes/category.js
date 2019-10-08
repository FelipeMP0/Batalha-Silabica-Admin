module.exports = (server) => {
  server.get('/category', (req, res) => {
    server.app.controllers.category.category(server, req, res);
  });
};
