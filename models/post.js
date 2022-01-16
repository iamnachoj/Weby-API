const mongoose = require("mongoose");

// define schema
const postSchema = new mongoose.Schema({
  title: {
   type: String,
   required: "Title is required",
   minlength: 4,
   maxlength: 60
  },
  body: {
    type: String,
    required: "The post requires some text in the body.",
    minlength: 1,
    maxlength: 1000
  }
});

module.exports = mongoose.model("Post", postSchema);