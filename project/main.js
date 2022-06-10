"use strict";

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");

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

router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.get("/", homeController.showHomePage);

router.get("/confirmMail", usersController.postedSignUp);
router.get("/chatrooms", usersController.showChatrooms);
router.get("/signIn", usersController.showSignIn);
router.post("/signIn", usersController.show, usersController.showView);
router.get("/signUp", usersController.showSignUp);
router.post("/signUp", usersController.saveUser);
router.get("/users", usersController.index);
router.get("/users", usersController.getAllUsers,(req, res, next) => {
  res.render("users",{users: req.data});
});
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);

// error handling
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);



// Error handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});
