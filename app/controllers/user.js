const crypto = require('crypto');

module.exports.registration = (server, req, res) => {
  res.render('register');
};

module.exports.register = (server, req, res) => {
  const userData = req.body;

  const newUser = new server.app.models.dao.index.models.User({
    username: userData.username,
    password: crypto.createHash('md5').update(userData.password).digest('hex'),
  });

  newUser.save();

  res.redirect('index');
};
