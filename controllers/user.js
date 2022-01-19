const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "User not found"
      })
    }
    req.profile = user // add profile object in request as "profile" with user info
    next();
  })
}