module.exports.list = async (server, req, res) => {
  let categories = [];

  if (req.session.userId && req.session.authorized) {
    categories = await server.models.dao.index.models.Category.find({
      user: req.session.userId,
    });
    res.render('categoryList', {list: categories});
  } else {
    res.render('login');
  }
};

module.exports.listForGame = async (server, req, res) => {
  let categories =
    await server.models.dao.index.models.Category.find({}, 'name')
        .populate('words');

  categories = categories.filter((category) => {
    return category.words && category.words.length !== 0;
  });

  categories = categories.map((category) => {
    return {_id: category._id, name: category.name};
  });

  res.status(200).send(categories);
};

module.exports.createForm = (server, req, res) => {
  if (req.session.authorized) {
    res.render('createCategory', {categoryId: null, categoryName: null});
  } else {
    res.render('login');
  }
};

module.exports.create = (server, req, res) => {
  if (req.session.userId && req.session.authorized) {
    const categoryData = req.body;

    const newCategory = new server.models.dao.index.models.Category({
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

module.exports.updateForm = async (server, req, res) => {
  if (req.session.authorized) {
    const categoryId = req.params.id;

    const category = await server.models.dao.index.models.Category.findOne({
      _id: categoryId,
    });

    res.render('createCategory', {
      categoryId: category.id,
      categoryName: category.name,
    });
  } else {
    res.render('login');
  }
};

module.exports.update = async (server, req, res) => {
  if (req.session.userId && req.session.authorized) {
    const categoryData = req.body;
    const categoryId = req.params.id;

    const category = await server.models.dao.index.models.Category.findOne({
      _id: categoryId,
    });

    category.name = categoryData.name;

    category.save();

    res.redirect('../categories');
  } else {
    res.render('login');
  }
};

module.exports.delete = async (server, req, res) => {
  if (req.session.userId && req.session.authorized) {
    const categoryId = req.params.id;

    await server.models.dao.index.models.Category.deleteOne({_id: categoryId});

    await server.models.dao.index.models.Word.deleteMany({
      category: categoryId,
    });

    res.redirect('../categories');
  } else {
    res.render('login');
  }
};
