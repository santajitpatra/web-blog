const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require("./routes/user")

const app = express();
const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/web_blog")
  .then((e) => console.log(`mongodb connect`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended : false }));

app.get("/", (req, res) => {
  res.render("home")
});

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
