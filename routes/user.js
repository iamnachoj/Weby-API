const express = require("express");
const {userById, allUsers, getUser, updateUser, deleteUser} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

router.get("/users", allUsers)
router.get("/users/:userId", requireSignin, getUser)
router.put("/users/:userId", requireSignin, updateUser)
router.delete("/users/:userId", requireSignin, deleteUser)
module.exports = router;