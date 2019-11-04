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
}, {toJSON: {virtuals: true}});

categorySchema.virtual('words', {
  ref: 'Word',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
