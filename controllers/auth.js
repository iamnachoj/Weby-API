const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { sendEmail } = require("../helpers");

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
    user.lastConnected = Date.now()
    user.save()
    console.log(user.lastConnected, user.name)
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

exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
      return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "User with that email does not exist!"
          });

      // generate a token with user id and secret
      const token = jwt.sign(
          { _id: user._id, iss: "NODEAPI" },
          process.env.JWT_SECRET
      );

      // email data
      const emailData = {
          from: "noreply@node-react.com",
          to: email,
          subject: "Password Reset Instructions",
          text: `Please use the following link to reset your password: ${
              process.env.CLIENT_URL
          }/reset-password/${token}`,
          html: `<p>Please use the following link to reset your password:</p> <p>${
              process.env.CLIENT_URL
          }/reset-password/${token}</p>`
      };

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
              return res.json({ message: err });
          } else {
              sendEmail(emailData);
              return res.status(200).json({
                  message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
              });
          }
      });
  });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "Invalid Link!"
          });

      const updatedFields = {
          password: newPassword,
          resetPasswordLink: ""
      };

      user = _.extend(user, updatedFields);
      user.updated = Date.now();

      user.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          }
          res.json({
              message: `Great! Now you can login with your new password.`
          });
      });
  });
};