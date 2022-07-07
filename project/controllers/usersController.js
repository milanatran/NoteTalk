const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/NoteTalk_db",
 {useNewUrlParser: true}
);
const User = require("../models/user");
const Chatroom = require("../models/chatroom");
const passport = require("passport") ;
const httpStatus = require("http-status-codes");
const jsonWebToken = require("jsonwebtoken");
const token = process.env.TOKEN || "recipeT0k3n";

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
    chatroomInvitations: (req, res) => {
     if (req.query.format === "json") {
      res.json(res.locals.user.chatroomInvitations);
      console.log(res.locals.user);
      console.log(res.locals.user.chatroomInvitations);
      console.log("got until chatroomInvitations");
      } else {
        res.render(`/users/${user._id}/chatroomInviations`);
        console.log("got until chatroomInvitations")
      }
    },
    respondJSON: (req, res) => {
     res.json({
     status: httpStatus.OK,
     data: res.locals
     });
    },

    chatroomsView: (req, res) => {
     if (req.query.format === "json") {
      res.json(res.locals.user.chatrooms);
      console.log(res.locals.user);
      console.log(res.locals.user.chatrooms);
      } else {
        res.render(`/users/${user._id}/chatrooms`);
      }
    },
    respondJSON: (req, res) => {
    res.json({
    status: httpStatus.OK,
    data: res.locals
    });
    },

    join: (req, res, next) => {
     let invitationId = req.params.invitationId,
     currentUser = req.user;
     if (currentUser) {
     User.findByIdAndUpdate(currentUser, {
          $addToSet: {chatrooms: invitationId},
          $pull:{chatroomInvitaions: invitationId}
     })
    .then(() => {
    res.locals.success = true;
    next();
    })
    .catch(error => {
    next(error);
    });
     } else {
     next(new Error("User must log in."));
     }
    },

    invitaionView:(req, res, next)=>{

    },

    sendInvitation:(req, res, next)=>{
      let email = req.body.email;
      let user;

      //find User
      User.findUserByEmail(userId)
    	 .then(result=>{user = result})
       .catch(error => {
         next(error);
          });
    //add Invitation to the Array of Invitaions
      User.findByIdAndUpdate(user, {
       $addToSet: {chatroomInvitations: invitationId},
        })
       .then(() => {
         res.locals.success = true;
         next();
       })
       .catch(error => {
       next(error);
       });
    },

    errorJSON: (error, req, res, next) => {
     let errorObject;
     if (error) {
     errorObject = {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    message: error.message
     };
     } else {
     errorObject = {
    status: httpStatus.OK,
    message: "Unknown Error."
     };
     }
     res.json(errorObject);
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

      redirectView: (req, res, next) => {
       let redirectPath = res.locals.redirect;
       console.log(redirectPath);
       if (redirectPath) res.redirect(redirectPath);
       else next();
     },

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
    },

   //  verifyToken: (req, res, next) => {
   //   let token = req.query.apiToken;
   //   if (token) {
   //    User.findOne({ apiToken: token })
   //    .then(user => {
   //      if (user) next();
   //      else next(new Error("Invalid API token."));
   //    })
   //    .catch(error => {
   //      next(new Error(error.message));
   //    });
   //   } else {
   //     next(new Error("Invalid API token."));
   //   }
   // },

   apiAuthenticate: (req, res, next) => {
     passport.authenticate("local", (errors, user) => {
       if (user) {
        let signedToken = jsonWebToken.sign(
         {
           data: user._id,
           exp: new Date().setDate(new Date().getDate() + 1)
        },
        "secret_encoding_passphrase"
        );
        res.json({
          success: true,
          token: signedToken
        });
       } else
      res.json({
        success: false,
        message: "Could not authenticate user."
      });
    })(req, res, next);
  },

  verifyJWT: (req, res, next) => {
   let token = req.headers.token;
   if (token) {
    jsonWebToken.verify(
      token,
      "secret_encoding_passphrase",
      (errors, payload) => {
        if (payload) {
        User.findById(payload.data).then(user => {
          if (user) {
            next();
          } else {
           res.status(httpStatus.FORBIDDEN).json({
             error: true,
             message: "No User account found."
           });
          }
        });
        } else {
          res.status(httpStatus.UNAUTHORIZED).json({
            error: true,
            message: "Cannot verify API token."
          });
          next();
        }
      }
   );
  } else {
     res.status(httpStatus.UNAUTHORIZED).json({
      error: true,
      message: "Provide Token"
     });
   }
  }
};
