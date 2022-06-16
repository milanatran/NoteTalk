const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");
const Chatroom = require("../models/chatroom");

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
  //  res.render("confirmMail");
      req.flash("success", `${result.name}'s account created successfully!`);
      res.locals.redirect = ``/users/${user._id}`;
      res.locals.user = user;
      next();
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
        `Failed to create user account because: ➥${error.message}.`
      );
      next();
   });
  },

  redirectView: (req, res, next) => {
   let redirectPath = res.locals.redirect;
   res.locals.user = res.locals.user;
   if (redirectPath) res.redirect(redirectPath);
   else next();
 },

   show: (req, res, next) => {
     let userEmail = req.body.email;
     User.findOne({email:userEmail})
     .populate("chatrooms")
     .then(result=> {res.locals.user = result;res.locals.redirect=`../users/${result._id}`; next();})
     .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
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
}

};
