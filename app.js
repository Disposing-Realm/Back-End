const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./route/userRoute.js");
const postsRouter = require("./route/postsRoute.js");


// const Router = require("./route/Route");
const commentsRouter = require("./route/commentsRoute");
// const authenticate = require("./auth");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const indexpg = (req, res) => {
  res.sendFile(path.join(target, "./public/views", "index.html"));
};

const signUpPage = (req, res) => {
  res.sendFile(path.join(target, "./public/views", "loginPage.html"));
};

const homePage = (req, res) => {
  res.sendFile(path.join(target, "./public/views", "homePage.html"));
};

// const getPage = (req, res) => {
//   res.sendFile(path.join(target, "./public/views", "Page.html"));
// };

app.get("/", indexpg);
app.get("/signup ", signUpPage);
// app.get("/home", authenticate, homePage);
// app.get("/ ", authenticate, getPage);


app.use("/users", userRouter);
app.use("/posts", postsRouter)
app.use("/comments", commentsRouter);
// app.use("/ ", Router);

app.listen(PORT, () => {
  console.log(`disposing listening on port ${PORT}`);
});