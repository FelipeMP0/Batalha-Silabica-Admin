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
  let chosenWords = [];

  try {
    const category = req.query.category;

    const foundCategory = await server.models.dao.index.models.Category.findOne({
      name: category,
    });

    const words = await server.models.dao.index.models.Word.find({
      category: foundCategory._id,
    });

    if (words && words.length > 0) {
      const wordsUpToTwoSyllables = words.filter((word) => {
        const syllables = word.separatedBySyllables.split('-');

        for (let i = 0; i < syllables.length; i++) {
          if (syllables[i].length > 3) {
            return false;
          }
        }

        return syllables.length === 2;
      });

      const wordsUpToThreeSyllables = words.filter((word) => {
        const syllables = word.separatedBySyllables.split('-');

        for (let i = 0; i < syllables.length; i++) {
          if (syllables[i].length > 3) {
            return false;
          }
        }

        return syllables.length === 3;
      });

      const twoSyllablesWord = wordsUpToTwoSyllables[Math.floor(
          Math.random() * wordsUpToTwoSyllables.length)];

      const twoSyllablesWordArray =
          twoSyllablesWord.separatedBySyllables.split('-');

      const indexToRemove =
          Math.floor(Math.random() * wordsUpToThreeSyllables.length);

      const threeSyllablesWord1 = wordsUpToThreeSyllables[indexToRemove];

      wordsUpToThreeSyllables.splice(indexToRemove, 1);

      const threeSyllablesWordArray1 =
          threeSyllablesWord1.separatedBySyllables.split('-');

      const threeSyllablesWord2 = wordsUpToThreeSyllables[Math.floor(
          Math.random() * wordsUpToThreeSyllables.length)];

      const threeSyllablesWordArray2 =
            threeSyllablesWord2.separatedBySyllables.split('-');

      chosenWords = [...twoSyllablesWordArray,
        ...threeSyllablesWordArray1,
        ...threeSyllablesWordArray2];
    }
  } catch (e) {

  }

  res.status(200).send(chosenWords);
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
