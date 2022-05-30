const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");

module.exports =  {
    index: (req, res) => {
      User.find({}).then(users => {
        res.render("users/index", {
          users: users
        })
      })
      .catch(error => {
          console.log(`Error fetching users: ${error.message}`)
        res.redirect("/");
      });
    },

    getAllUsers:  (req, res, next) => {
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
   },

   saveUser: (req, res) => {
    let newUser = new User({
    name: req.body.name,
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
  },

  showSignUp: (req, res) => {
    res.render("signUp");
  },

  showSignIn: (req, res) => {
    res.render("signIn");
  },

  showProfile: (req, res) => {
    res.render("overview");
  },

  postedSignUp: (req, res) => {
    res.render("confirmMail");
  }
};
