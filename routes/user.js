const express = require("express");
const {userById, allUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const {postById} = require("../controllers/post");
const {requireSignin} = require("../controllers/auth");

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById);
//routes containing :postId (the app will always execute first the postById method)
router.param("postId", postById);

router.get("/users", allUsers)
router.get("/users/:userId", requireSignin, getUser)
router.put("/users/:userId", requireSignin, updateUser)
router.delete("/users/:userId", requireSignin, deleteUser)
module.exports = router;