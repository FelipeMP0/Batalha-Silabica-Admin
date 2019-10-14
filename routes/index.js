module.exports = (server) => {
  server.get('/', (req, res) => {
    server.controllers.index.index(server, req, res);
  });
};
