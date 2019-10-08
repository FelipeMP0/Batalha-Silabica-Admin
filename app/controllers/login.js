const crypto = require('crypto');

module.exports.login = (server, req, res) => {
  res.render('login');
};

module.exports.authenticate = async (server, req, res) => {
  const userData = req.body;

  const password = crypto.createHash('md5')
      .update(userData.password)
      .digest('hex');

  const user = await server.app.models.dao.index.models.User
      .findByUsernameAndPassword(userData.username, password);

  if (user) {
    req.session.authorized = true;
  }

  if (req.session.authorized) {
    res.redirect('category');
  } else {
    res.render('login');
  }

  console.log(user);
};
