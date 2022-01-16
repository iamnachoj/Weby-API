const Post = require("../models/post")

exports.getPosts = (req, res) => {
  res.json({
    posts: [
      {title: "first post"},
      {title: "second post"}
    ]
  })
}

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  console.log("Creating post: ", post)
}