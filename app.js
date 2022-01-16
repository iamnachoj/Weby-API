//dotenv package
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan"); // tracks info about requests
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
const postRoutes = require("./routes/post")

// middleware
app.use(morgan('dev'))
app.use("/", postRoutes);

//server port
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`server started on port ${port}`)
});

