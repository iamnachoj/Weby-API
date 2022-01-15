const express = require("express");
const morgan = require("morgan"); // tracks info about requests
const app = express();

// bring in routes
const postRoutes = require("./routes/post")

// middleware
app.use(morgan('dev'))
app.use("/", postRoutes);

//server port
const port = 3000
app.listen(port, (err) => {
    console.log(`server started on port ${port}`)
});

