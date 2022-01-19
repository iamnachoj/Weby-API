const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

//Registration process
exports.signup = async (req, res) => {
  //check if email already exists on DB
 const userExist = await User.findOne({email: req.body.email})
 if(userExist) return res.status(403).json({error: "This email is already registered"})
 //Save user and respond
 const user = await new User(req.body)
 await user.save()
 res.status(200).json({message: "Successfully created!. Please log in"})
}
//Log in access process
exports.signin = (req, res) => {
  //grab expected data from body (object destructuring)
  const {email, password} = req.body
  // find user based on email
  User.findOne({email}, (err, user) => {
    if(err || !user){
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }
    // authenticate user (using authenticate() method from user model)
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Incorrect password"
      });
    } 
    //generate a token with user ID + secret
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    //persist the token as "t" in cookie to front-end client
    res.cookie("t", token, {expire: new Date() + 12000 })
    //json response with user and token to front-end client
    const {_id, name, email} = user
    return res.status(200).json({token, user: {_id, email, name}});
  });
}
//Log out process
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({message: "Signed out successfully"})
}
//check user logged in
exports.requireSignin = expressJwt({
  // if the token is valid, express-jwt appends the verified user's ID in an auth key to the request object
  secret:process.env.JWT_SECRET,algorithms: ['HS256'],
  userProperty: "auth"
});