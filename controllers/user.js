const crypto = require('crypto');

module.exports.registration = (server, req, res) => {
  res.render('register');
};

module.exports.register = (server, req, res) => {
  const userData = req.body;

  const newUser = new server.models.dao.index.models.User({
    username: userData.username,
    password: crypto.createHash('md5').update(userData.password).digest('hex'),
    createdAt: new Date(),
  });

  const user = newUser.save();

  if (user) {
    req.session.authorized = true;
    req.session.userId = user.id;
  }

  res.redirect('categories');
};

module.exports.login = (server, req, res) => {
  res.render('login');
};

module.exports.authenticate = async (server, req, res) => {
  const userData = req.body;

  const password = crypto.createHash('md5')
      .update(userData.password)
      .digest('hex');

  const user = await server.models.dao.index.models.User
      .findByUsernameAndPassword(userData.username, password);

  if (user) {    
    req.session.authorized = true;
    req.session.userId = user.id;
  }

  if (req.session.authorized) {
    res.redirect('categories');
  } else {
    res.render('login');
  }
};

module.exports.logout = (server, req, res) => {
  req.session.destroy(function(err) {
    res.redirect('login');
  });
};
