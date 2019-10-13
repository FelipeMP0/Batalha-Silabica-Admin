module.exports.list = async (server, req, res) => {
  let categories = [];

  if (req.session.userId && req.session.authorized) {
    categories = await server.app.models.dao.index.models.Category.find({
      user: req.session.userId,
    });
  }

  res.render('categoryList', {list: categories});
};

module.exports.createForm = (server, req, res) => {
  if (req.session.authorized) {
    res.render('createCategory');
  } else {
    res.render('login');
  }
};

module.exports.create = (server, req, res) => {
  if (req.session.userId && req.session.authorized) {
    const categoryData = req.body;

    const newCategory = new server.app.models.dao.index.models.Category({
      name: categoryData.name,
      user: req.session.userId,
      createdAt: new Date(),
    });

    newCategory.save();

    res.redirect('categories');
  } else {
    res.render('login');
  }
};
