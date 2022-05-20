 "use strict";

 const mongoose = require("mongoose");
 mongoose.connect(
  "mongodb://localhost:27017/NoteTalk_db",
  {useNewUrlParser: true}
 );
mongoose.Promise= global.Promise;
const express = require("express"),
app = express();
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");
const usersController = require("./controllers/usersController");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.get("/", homeController.showHomePage);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});

app.get("/chatrooms", homeController.showOverview);
app.get("/contact", homeController.showSignUp);
app.get("/signIn", homeController.showSignIn);
app.post("/contact", homeController.postedSignUp);

app.get("/signUp", usersController.showSignUp);
app.post("/signUp", usersController.saveUser);


app.get("/users", usersController.getAllUsers,(req, res, next) => {
  res.render("users",{users: req.data});
  });

// error handling
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

const db = mongoose.connection;


db.once("open", () => {
 console.log("Successfully connected to MongoDB using Mongoose!");
});

//const User = mongoose.model("User", signUpSchema);

//create and save a user in a single step
//TODO: dont accept signUps that dont match the schema


var findMilana = User.findOne({username: "Milana Tran"}).where("email",/htw/);
findMilana.exec();

// User.create(
// {
//   username: "Milana Tran",
//   email: "Milana.Tran@Student.htw-berlin.de",
//   password: 1234
// },
// function (error, savedDocument) {
// if (error) console.log(error);
// console.log(savedDocument);
// }
// );
//
//
// var findMilana = User.findOne({username: "Milana Tran"}).where("email",/htw/);
// findMilana.exec();
