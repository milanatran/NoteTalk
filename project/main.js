"use strict";

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const router = express.Router();

// Database
mongoose.Promise = global.Promise;
mongoose.connect(
"mongodb://localhost:27017/NoteTalk_db",
{useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// Routes
app.get("/", homeController.showHomePage);

app.get("/chatrooms", usersController.showChatrooms);
app.get("/contact", usersController.showSignUp);
app.get("/signIn", usersController.showSignIn);
app.post("/contact", usersController.postedSignUp);
app.get("/signUp", usersController.showSignUp);
app.post("/signUp", usersController.saveUser);
app.get("/users", usersController.index, usersController.indexView);
app.get("/users", usersController.getAllUsers,(req, res, next) => {
  res.render("users",{users: req.data});
});

// Error handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});
