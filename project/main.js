"use strict";

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = require("./routes/index");
const layouts = require("express-ejs-layouts");


const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const expressValidator = require("express-validator");
const User = require("./models/user");


/************************************** test creating chatrooms START*/
const passport = require("passport");

/*
const io = require("socket.io")(3000); //TODO: server mit dem socket wird schon verwendet
const users = {};
io.on("connection", socket => {
  socket.on("new-user", name => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", message => {
    // Send message to everyone connected to the server except for the sender
    socket.broadcast.emit("chat-message", {message: message, name: users[socket.id]})
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  })
});
*/

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

app.use(express.static("public"));
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
express.urlencoded();
app.use(expressValidator());

app.use(methodOverride("_method", {
 methods: ["POST", "GET"]
}));

//sessions for not having to login al the time
app.use(cookieParser("secret_passcode"));
app.use(expressSession({
 secret: "secret_passcode",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
}));
app.use(connectFlash());


app.use(passport.initialize());
app.use(passport.session());

//data security
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//every request   uses that
app.use((req, res, next) => {
 res.locals.flashMessages = req.flash();
 res.locals.loggedIn = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
});





//routes
app.use("/", router);


const server = app.listen(app.get("port"), () => {
 console.log(`Server running at http://localhost: ${ app.get("port") }`);
}),
io = require("socket.io")(server);
 require("./controllers/chatController")(io) ;
