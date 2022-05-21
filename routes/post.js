const express = require("express");
const {postById, getPosts, getOnePost, createPost, postsByUser, isPoster, deletePost, updatePost, postPhoto, addlike, removeLike} = require("../controllers/post");
const {userById} = require("../controllers/user");
const {requireSignin} = require("../controllers/auth");
const {createPostValidator} = require("../validator");

const router = express.Router();

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById);
//routes containing :postId (the app will always execute first the postById method)
router.param("postId", postById);

//get all the posts
router.get("/posts", getPosts );
//like unlike posts
router.put("/posts/like/", requireSignin, addlike)
router.put("/posts/unlike/", requireSignin, removeLike)
//get one post
router.get("/posts/:postId", getOnePost)
//get posts by user
router.get("/posts/by/:userId", postsByUser);
//create posts
router.post("/posts/new/:userId", requireSignin, createPost, createPostValidator);
//update posts
router.put("/posts/edit/:postId", requireSignin, isPoster, updatePost);
//delete posts
router.delete("/posts/delete/:postId", requireSignin, isPoster, deletePost);
//post image separate route, to gain load time
router.get("/posts/photo/:postId", postPhoto)

module.exports = router;