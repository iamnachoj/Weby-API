const express = require("express");
const {userById, allUsers, getUser} = require("../controllers/user")

const router = express.Router() 

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

router.get("/users", allUsers)
router.get("/users/:userId", getUser )



module.exports = router;