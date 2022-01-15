const express = require("express");
const app = express();

// bring in routes
const {getPosts} = require("./routes/post")

app.get("/", getPosts);

//server port
const port = 3000
app.listen(port, (err) => {
    console.log(`server started on port ${port}`)
});

