const express = require("express");
const {getPosts, createPost} = require("../controllers/post")
const {userById} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")
const {createPostValidator} = require("../validator");

const router = express.Router() 

router.get("/", requireSignin, getPosts );
router.post("/post", createPostValidator, createPost )

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

module.exports = router;