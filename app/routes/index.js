module.exports = (server) => {
  server.get('/', (req, res) => {
    server.app.controllers.index.index(server, req, res);
  });
};
