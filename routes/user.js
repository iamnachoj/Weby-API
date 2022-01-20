const express = require("express");
const {userById, allUsers} = require("../controllers/user")

const router = express.Router() 

router.get("/users", allUsers)

//routes containing :userId (the app will always execute first the userById method)
router.param("userId", userById)

module.exports = router;