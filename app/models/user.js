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

userSchema.statics.findByUsernameAndPassword =
  async function(username, password) {
    const user = await this.findOne({
      username: username,
      password: password,
    });

    return user;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
