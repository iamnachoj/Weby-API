const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema; // destructure ObjectId, value that has the ID of the object, and ref: User. Ch

// define schema
const postSchema = new mongoose.Schema({
  title: {
   type: String,
   required: true,
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  likes: [{type: ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Post", postSchema);