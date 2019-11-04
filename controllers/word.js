const difficultyLevels = require('../enums/difficultyLevel');

module.exports.list = async (server, req, res) => {
  if (req.session.authorized) {
    const categoryId = req.params.id;

    const words = await server.models.dao.index.models.Word.find({
      category: categoryId,
    });

    words.map((word) => {
      word.difficultyLevel = difficultyLevels[word.difficultyLevel];
    });

    res.render('wordList', {list: words, categoryId: categoryId});
  } else {
    res.render('login');
  }
};

module.exports.listForGame = async (server, req, res) => {
  let words = await server.models.dao.index.models.Word.find({});
};

module.exports.createForm = (server, req, res) => {
  if (req.session.authorized) {
    const categoryId = req.params.id;

    res.render('createWord', {
      categoryId: categoryId,
      difficultyLevels: difficultyLevels,
    });
  } else {
    res.render('login');
  }
};

module.exports.create = async (server, req, res) => {
  if (req.session.authorized) {
    const categoryId = req.params.id;
    const wordData = req.body;

    const word = wordData.word.toLowerCase();

    const wordSeparatedBySyllables = wordData.separatedBySyllables
        .toLowerCase();

    const wordWithoutHyphen = wordSeparatedBySyllables.replace(/-/g, '')
        .toLowerCase();

    if (word === wordWithoutHyphen) {
      const newWord = new server.models.dao.index.models.Word({
        word: word,
        separatedBySyllables: wordSeparatedBySyllables,
        difficultyLevel: wordData.difficultyLevel,
        category: categoryId,
        createdAt: new Date(),
      });

      newWord.save();

      res.redirect('words');
      return;
    }
    res.redirect('create-word');
  } else {
    res.render('login');
  }
};

module.exports.delete = async (server, req, res) => {
  if (req.session.authorized) {
    const wordId = req.params.wordId;

    await server.models.dao.index.models.Word.deleteOne({_id: wordId});

    res.redirect('../words');
    return;
  } else {
    res.render('login');
  }
};
