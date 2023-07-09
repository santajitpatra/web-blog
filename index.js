const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog")

const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/web_blog")
  .then((e) => console.log(`mongodb connect`));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  })
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
