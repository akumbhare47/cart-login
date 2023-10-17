const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  pass: {
    type: String,
    reqired: true,
  },
  re_pass: {
    type: String,
    reqired: true,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
