const express = require("express");
const {getPosts, createPost} = require("../controllers/post")
const {userById} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")
const {createPostValidator} = require("../validator");

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

//get all the posts
router.get("/", getPosts );

//create posts
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator )


module.exports = router;