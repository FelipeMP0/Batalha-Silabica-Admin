module.exports.index = (server, req, res) => {
  if (req.session.authorized) {
    res.render('categoryList', {list: []});
  } else {
    res.redirect('login');
  }
};
