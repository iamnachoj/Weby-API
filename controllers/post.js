const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");

//Get the posts
exports.getPosts = (req, res) => {
   const posts = Post.find()
   .populate("postedBy", "name")
   .select("_id title body")
   .then((posts) => {
     res.status(200).json(posts)
   })
   .catch(err => console.log(err))
}

// get posts by user
exports.postsByUser = (req, res) => {
  Post.find({postedBy: req.profile._id})
      .populate("postedBy", "name")
      .sort("_created")
      .exec((err, posts) => {
        if(err){
          return res.status(400).json({
            error: err
          });
        }
        res.json(posts)
      })
}

//create a post
exports.createPost = (req, res, next) => {
  //using formidable to create post. Check out documentation for more.
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if(err){
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Post(fields)
    //handle the post's creator (the user)
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.profile.__v = undefined;
    post.postedBy = req.profile;
    //handle the files (in case there is image)
    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if(err){
        return res.status(400).json({error: err});
      }
      res.status(200).json(result)
    });
  });
 }