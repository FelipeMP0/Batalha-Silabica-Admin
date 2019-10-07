const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
