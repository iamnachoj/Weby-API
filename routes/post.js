const express = require("express");
const {getPosts, createPost, postsByUser} = require("../controllers/post")
const {userById} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")
const {createPostValidator} = require("../validator");

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

//get all the posts
router.get("/posts", getPosts );
//get posts by user
router.get("/posts/by/:userId", postsByUser)
//create posts
router.post("/posts/new/:userId", requireSignin, createPost, createPostValidator )


module.exports = router;