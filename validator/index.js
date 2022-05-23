//Validation for new posts
exports.createPostValidator = (req, res, next) => {
  //title
  req.check("title", "Please, add a title").notEmpty();
  req.check("title", "Title must have between 4 and 60 characters").isLength({
    min: 4,
    max: 60
  });
  //body
  req.check("body", "You must write something in the body").notEmpty();
  req.check("body", "the body content must have between 1 and 1500 characters").isLength({
    min:1,
    max:1500
  });
  //check for errors
  const errors = req.validationErrors()
  //if error show the first one as they happen
  if(errors){
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({error: firstError})
  }
  // proceed to next middleware
  next();
}

exports.userSignupValidator = (req, res, next) => {
  //name
  req.check("name", "Please, add a name").notEmpty();
  req.check("name", "Please, use between 4 and 20 characters for your username").isLength({
    min: 4,
    max: 20
  });
  //password
  req.check("password", "Please, enter a password").notEmpty();
  req.check("password", "Please, use a minimum of 8 characters for your password").isLength({
    min: 8,
    max: 50
  });
  req.check("password", "Password must contain at least 1 number").matches(/\d/)
  //email
  req.check("email", "Please, add an email").notEmpty();
  req.check("email", "Please, add a valid email").isEmail();
  //check for errors
  const errors = req.validationErrors()
  //if error show the first one as they happen
  if(errors){
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({error: firstError})
  }
  // proceed to next middleware
  next();
}

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is required").notEmpty();
  req.check("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
      .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware or ...
  next();
};