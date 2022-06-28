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
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const User = require("./models/user");
const passport = require("passport");
/************************************** test creating chatrooms START*/
//https://www.youtube.com/watch?v=rxzOqP9YwmM&t=0s
//
// const io = require("socket.io")(3000); //TODO: server mit dem socket wird schon verwendet
// const users = {};
// io.on("connection", socket => {
//   socket.on("new-user", name => {
//     users[socket.id] = name;
//     socket.broadcast.emit("user-connected", name);
//   });
//   socket.on("send-chat-message", message => {
//     // Send message to everyone connected to the server except for the sender
//     socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]})
//   });
//   socket.on("disconnect", () => {
//     socket.broadcast.emit("user-disconnected", users[socket.id]);
//     delete users[socket.id];
//   })
// });
/************************************** test creating chatrooms END */

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

//sessions for not having to login al the time
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


router.use(passport.initialize());
router.use(passport.session());

//data security
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//every request   uses that
router.use((req, res, next) => {
 res.locals.flashMessages = req.flash();
 res.locals.loggedIn = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
});

//routes
router.get("/", homeController.showHomePage);
router.get("/chat", homeController.chat);

router.get("/confirmMail", usersController.postedSignUp);
router.get("/chatrooms", usersController.showChatrooms);
router.get("/signIn", usersController.showSignIn);
router.post("/signIn", usersController.authenticate);
router.get("/signUp", usersController.showSignUp);
router.post("/signUp",usersController.validate, usersController.saveUser,usersController.redirectView);//, usersController.postedSignUp
router.get("/users/logout", usersController.logout, usersController.redirectView);
router.get("/users/:id",usersController.loadUserById,usersController.showView);
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

const server = app.listen(app.get("port"), () => {
 console.log(`Server running at http://localhost:${ app.get("port") }`);
});
const io = require("socket.io")(server);
require("./controllers/chatController")(io);
