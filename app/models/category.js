const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
  createdAt: {
    type: Date,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
