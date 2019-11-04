module.exports = (server) => {
  server.get('/api/categories', (req, res) => {
    server.controllers.category.listForGame(server, req, res);
  });
};
