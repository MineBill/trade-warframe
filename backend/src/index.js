const express = require("express");
const app = express();
const port = 3000;

let counter = 0

app.get("/", (req, res) => {
    res.send("Hello, World");
});

app.get("/counter", (req, res) => {
    res.send(`Counter is: ${counter++}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});