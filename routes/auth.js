const express = require("express");
const {signup, signin, signout} = require("../controllers/auth")
const {userById} = require("../controllers/user")
const {postById} = require("../controllers/post");
const {userSignupValidator} = require("../validator");

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)
//routes containing :postId (the app will always execute first the postById method)
router.param("postId", postById);

router.post("/signup", userSignupValidator, signup )
router.post("/signin", signin)
router.get("/signout", signout)



module.exports = router;