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