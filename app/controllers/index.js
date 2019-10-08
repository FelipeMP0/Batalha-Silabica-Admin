module.exports.index = (server, req, res) => {
  if (req.session.authorized) {
    res.render('category');
  } else {
    res.redirect('login');
  }
};
