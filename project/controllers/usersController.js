const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");
exports.getAllUsers = (req, res, next) => {
  User.find( {})
  .exec()
  .then((users) => {
    res.render("users", {
    users: users
    });
 })
 .catch((error) => {
console.log(error.message);
return [];
 })
 .then(() => {
console.log("promise complete");
 });
};

exports.saveUser = (req, res) => {
 let newUser = new User({
 username: req.body.username,
 email: req.body.email,
 password: req.body.password
 });
 newUser.save()
 .then(result => {
 res.render("confirmMail");
 })
 .catch(error => {
 if (error) res.send(error);
 });
};

exports.showSignUp = (req, res) => {
  res.render("signUp");
}

exports.showSignIn = (req, res) => {
  res.render("signIn");
}

exports.showProfile = (req, res) => {
  res.render("overview");
}
