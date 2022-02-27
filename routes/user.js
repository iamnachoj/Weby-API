const express = require("express");
const {userById, hasAuthorization, allUsers, getUser, updateUser, deleteUser, userAvatar} = require("../controllers/user")
const {postById} = require("../controllers/post");
const {requireSignin} = require("../controllers/auth");

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById);
//routes containing :postId (the app will always execute first the postById method)
router.param("postId", postById);

router.get("/users", allUsers)
router.get("/users/:userId", requireSignin, getUser)
router.put("/users/edit/:userId", requireSignin, hasAuthorization, updateUser)
router.delete("/users/delete/:userId", requireSignin, hasAuthorization, deleteUser)

//Avatar separate route, to gain load time
router.get("/users/avatar/:userId", userAvatar)
module.exports = router;