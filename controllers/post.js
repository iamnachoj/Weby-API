const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

//params Post by ID
exports.postById = (req, res, next, id) => {
  Post.findById(id)
      .populate("postedBy", "_id name")
      .exec((err, post) => {
         if(err || !post){
           res.status(400).json({
             error: err
           });
         }
         req.post = post
         next();
      });
}
//Get the posts
exports.getPosts = (req, res) => {
   Post.find()
   .populate("postedBy", "name")
   .select("_id title body created photo updated")
   .then((posts) => {
     res.status(200).json(posts.reverse()) //reverse to get the newest posts first
   })
   .catch(err => console.log(err))
}
//get one post
exports.getOnePost = (req, res) => {
  return res.json(req.post)
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
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.filepath);
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

//check if the user who wants to do changes is the user who posted
exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if(!isPoster){
    return res.status(403).json({
      error: "User not authorized"
    });
  }
  console.log("Allowed")
  next();
}

//update Post
// exports.updatePost = (req, res, next) => {
//  let post = req.post
//  post = _.extend(post, req.body);
//  post.updated = Date.now()
//  post.save((err, post) => {
//    if(err){res.status(400).json({
//      error: err
//     });
//    }
//    res.status(200).json({
//      name: post.title,
//      message: "Post updated",
//      post: post
//    })
//  })
// }

exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      console.log(files)
      if (err) {
          return res.status(400).json({
              error: 'Photo could not be uploaded'
          });
      }
      // save post
      let post = req.post;
      // console.log("post in update: ", post);
      post = _.extend(post, fields);

      post.updated = Date.now();
      console.log("POST FORM DATA UPDATE: ", post);

      if (files.photo) {
          post.photo.data = fs.readFileSync(files.photo.filepath);
          post.photo.contentType = files.photo.type;
      }

      post.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          }
          console.log("post after update with formdata: ", post);
          res.json(post);
      });
  });
};

//delete Post
exports.deletePost = (req, res) => {
  let post = req.post
  post.remove((err, post)=> {
   if(err){
     return res.status(400).json({
       error: err
     });
   }
    res.json({
     message: "Post deleted."
   });
  });
}
//send photo from the post
exports.postPhoto = (req, res, next) => {
  if(req.post.photo.data){
  res.set('Content-Type', req.post.photo.contentType);
  return res.send(req.post.photo.data);
  }
};