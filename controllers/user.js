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

exports.hasAuthorization = (req,res,next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id
  if(!authorized){
    return res.status(403).json({
      error: "You are not authorized to perform this action"
    })
  }
  next();
}

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    return res.status(200).json({
      users
    })
  }).select("_id name email created updated")
}