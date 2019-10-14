const mongoose = require('mongoose');
const User = require('../user');
const Category = require('../category');
const Word = require('../word');

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

const models = {User, Category, Word};

module.exports.connectDb = connectDb;

module.exports.models = models;
