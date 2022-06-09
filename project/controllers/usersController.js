const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");

var room = [
 {
 title: "Project NoteTalk"
 },
 {
 title: "IMI Spam"
 },
 {
 title: "Family Chat"
 }
];

module.exports =  {

    index: (req, res, next) => {
      User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
     },

    indexView: (req, res) => {
     res.render("users/index");
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

  showChatrooms: (req, res) => {
    res.render("overview", {chatrooms: room});
  },

  showSignUp: (req, res) => {
    res.render("signUp");
  },

  showSignIn: (req, res) => {
    res.render("signIn");
  },

  showChatrooms: (req, res) => {
    res.render("overview", {chatrooms: room});
  },

  postedSignUp: (req, res) => {
    res.render("confirmMail");
  },

  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
     let userParams = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
     };

     User.create(userParams)
    .then(user => {
      res.locals.redirect = "/confirmMail";
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
  },

  redirectView: (req, res, next) => {
   let redirectPath = res.locals.redirect;
   if (redirectPath) res.redirect(redirectPath);
   else next();
 },

   show: (req, res, next) => {
     let userEmail = req.body.email;
     console.log(userEmail);
     console.log(req.body);
     User.findOne({email:userEmail})
     .then(result=> {res.locals.user =result; next();})
     .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
   },

  showView: (req, res) => {
   res.render("users/show");
  }
};
