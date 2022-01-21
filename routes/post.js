const express = require("express");
const {postById, getPosts, getOnePost, createPost, postsByUser, isPoster, deletePost} = require("../controllers/post");
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
//get one post
router.get("/posts/:postId", getOnePost)
//get posts by user
router.get("/posts/by/:userId", postsByUser);
//create posts
router.post("/posts/new/:userId", requireSignin, createPost, createPostValidator );
//delete posts
router.delete("/posts/delete/:postId", requireSignin, isPoster, deletePost )


module.exports = router;