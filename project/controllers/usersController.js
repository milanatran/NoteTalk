const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");
const Chatroom = require("../models/chatroom");
 const passport = require("passport") ;

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

const getUserParams = (body) => {
 return {
name: body.name,
email: body.email,
password: body.password
 };
 };

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
     if (req.query.format === "json") {
       console.log("hi");
      res.json(res.locals.users);
      } else {
        res.render("users");
      }
    },
    chatroomsView: (req, res) => {
     if (req.query.format === "json") {
      res.json(res.locals.user.chatrooms);
      console.log(res.locals.user);
      console.log(res.locals.user.chatrooms);
      } else {
        res.render("/users/chatrooms");
      }
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

   saveUser: (req, res, next) => {
     if (req.skip) next();
     let newUser = new User(getUserParams(req.body));

     User.register(newUser, req.body.password, (error, user) => {
       if (user) {
         req.flash("success", `${user.name}'s account created successfully!`);
         res.locals.redirect = "/confirmMail";
         next();
       } else {
         req.flash("error", `Failed to create user account because: ${error.message}.`);
         res.locals.redirect = "/signUp";
         next();
       }
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
/*
  new: (req, res) => {
    res.render("users/new");
  },

  create: (req, res, next) => {
   let userParams = getUserParams(req.body);
   User.create(userParams)
   .then(user => {
      req.flash("success", `${user.name}'s account created successfully!`);
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
   })
   .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      res.locals.redirect = "/users/new";
      req.flash(
        "error",
        `Failed to create user account because: ${error.message}.`
      );
      next();
   });
  },
*/
  redirectView: (req, res, next) => {
   let redirectPath = res.locals.redirect;
   console.log(redirectPath);
   if (redirectPath) res.redirect(redirectPath);
   else next();
 },

//flash messages do not work
 authenticate: passport.authenticate("local", {
 failureRedirect: "/signIn",
 failureFlash: "Failed to login.",
 successRedirect: "/",
 successFlash: "Logged in!"
}),

logout: (req, res, next) => {
 req.logout(function(err) {
   if (err) { return next(err); }
 });
 req.flash("success", "You have been logged out!");
 res.locals.redirect = "/";
 next();
},



  showView: (req, res) => {
   res.render("users/show");
 },

 loadUserById:(req, res, next) => {
   let userId = req.params.id;
  User.findById(userId)
   .populate("chatrooms")
   .then(result=> {res.locals.user = result;next();})
   .catch(error => {
    console.log(`Error fetching user by ID: ${error.message}`);
    next(error);
   });
},

 edit:(req, res) => {
  res.render("users/edit");
},


update: (req, res, next) => {
   let userId = req.params.id,
   userParams = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
   };
   User.findByIdAndUpdate(userId, {
     $set: userParams
   })
  .then(user => {
    console.log(user);
    res.locals.user = user;
    res.locals.redirect=`/users/${user._id}`;
    next();
  })
  .catch(error => {
    console.log(`Error updating user by ID: ${error.message}`);
    next(error);
  });
},

delete: (req, res, next) => {
   let userId = req.params.id;
   User.findByIdAndRemove(userId)
    .then(() => {
      res.locals.redirect = "/";
      next();
      })
    .catch(error => {
  console.log(`Error deleting user by ID: ${error.message}`);
  next();
  });
},

validate: (req, res, next) => {
  console.log(req.body);
 req.sanitizeBody("email").normalizeEmail({
   all_lowercase: true
 }).trim();
 req.check("email", "Email is invalid").notEmpty().isEmail();
 req.check("name", "name  is invalid").notEmpty().isString().isLength({
   min: 1,
   max: 25
 }).equals(req.body.name);
 req.check("password", "Password cannot be empty").notEmpty();
 req.getValidationResult().then((error) => {
  if (!error.isEmpty()) {
    let messages = error.array().map(e => e.msg);
    req.skip = true;
    req.flash("error", messages.join(" and "));
    res.locals.redirect = "/signUp";
    next();
  } else {
   next();
  }
 });
}

};
