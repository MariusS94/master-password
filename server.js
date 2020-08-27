const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("hey guys");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/passwords/wifi", (req, res) => {
  res.send("123");
});

app.get("/api/passwords/wifi", (req, res) => {
  res.send("123");
});
