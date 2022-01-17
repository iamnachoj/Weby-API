const mongoose = require("mongoose");

// define schema
const postSchema = new mongoose.Schema({
  title: {
   type: String,
   required: true,
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);