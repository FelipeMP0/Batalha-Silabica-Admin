const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
  },
  separatedBySyllables: {
    type: String,
  },
  difficultyLevel: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
  },
  createdAt: {
    type: Date,
  },
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
