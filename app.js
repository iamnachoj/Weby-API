//dotenv package
const dotenv = require("dotenv");
dotenv.config();

//express and other dependencies
const express = require("express");
const morgan = require("morgan"); // tracks info about requests
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const app = express();

//DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB connected")
});
mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`)
});



// bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user")

// middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cookieParser())
app.use(expressValidator()); // from version 5.3.1. Not available in newer versions.
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error: "Unauthorized user. Please log in or register"});
    }
  });

//server port
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`server started on port ${port}`)
});

