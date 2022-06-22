"use strict";

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");
const methodOverride = require("method-override");
const expressSession = require("express-session"),
 cookieParser = require("cookie-parser"),
 connectFlash = require("connect-flash");
const expressValidator = require("express-validator");

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
router.use(expressValidator());

router.use(methodOverride("_method", {
 methods: ["POST", "GET"]
}));

router.use(cookieParser("secret_passcode"));
router.use(expressSession({
 secret: "secret_passcode",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) => {
 res.locals.flashMessages = req.flash();
 next();
});

router.get("/", homeController.showHomePage);

router.get("/confirmMail", usersController.postedSignUp);
router.get("/chatrooms", usersController.showChatrooms);
router.get("/signIn", usersController.showSignIn);
router.post("/signIn", usersController.show, usersController.redirectView);
router.get("/users/:id",usersController.loadUserById,usersController.showView);
router.get("/signUp", usersController.showSignUp);
router.post("/signUp",usersController.validate, usersController.saveUser,usersController.redirectView);//, usersController.postedSignUp
router.get("/users", usersController.index);
router.get("/users", usersController.getAllUsers,(req, res, next) => {
  res.render("users",{users: req.data});
});
//router.get("/users/new", usersController.new);
//router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.loadUserById, usersController.edit);
router.put("/users/:id/update", usersController.update,usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

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
