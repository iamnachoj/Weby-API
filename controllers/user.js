const _ = require("lodash");
const User = require("../models/user");

//params Users by ID
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if(err || !user){
      return res.status(400).json({
        error: "User not found."
      });
    }
    req.profile = user // add profile object in request as "profile" with user info
    next();
  });
}

//check if user is authorized (method used to perform certain actions)
exports.hasAuthorization = (req,res,next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id
  if(!authorized){
    return res.status(403).json({
      error: "You are not authorized to perform this action"
    })
  }
  next();
}

//get all users
exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    return res.status(200).json(
      users
    )
  }).select("_id name created updated")
}

//get a particular user
exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.profile.__v = undefined;
  return res.json(req.profile)
}

//update an user
exports.updateUser = (req, res, next) => {
  let user = req.profile
  user = _.extend(user, req.body) // extend - mutate the source object. check documentation for lodash (extend method)
  user.updated = Date.now()
  user.save((err) => {
    if(err){
      return res.status(400).json({
        error: "User not authorized to perform this action"
      })
    }
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.profile.__v = undefined;
    res.json({user})
  })
}

//deletes an user
exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if(err){
      return res.status(400).json({
        error: err
      });
    }
    res.status(200).json({
      username: user.name,
      message: "User has been removed successfuly"
    });
  });
}