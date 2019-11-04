module.exports = (server) => {
  server.get('/api/words', (req, res) => {
    server.controllers.word.listForGame(server, req, res);
  });
};
