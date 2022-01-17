const mongoose = require("mongoose");

//define Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, //when spacing in the name, it will be cut
    required: true
  },
  email: {
    type: String,
    trim: true, //when spacing in the name, it will be cut
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

module.exports = mongoose.model("User", userSchema)