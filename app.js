const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!")
});

//server port
const port = 3000
app.listen(port, (err) => {
    console.log(`server started on port ${port}`)
});

