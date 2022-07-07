const router = require("express").Router();
const usersController = require("../controllers/usersController");

//Last status: Listing 26.1

router.get("/confirmMail", usersController.postedSignUp);
router.get("/chatrooms", usersController.showChatrooms);
router.get("/signIn", usersController.showSignIn);
router.post("/signIn", usersController.authenticate);
router.get("/signUp", usersController.showSignUp);
router.post("/signUp",usersController.validate, usersController.saveUser,usersController.redirectView);//, usersController.postedSignUp
router.get("/users/logout", usersController.logout, usersController.redirectView);


router.get("/users", usersController.getAllUsers,usersController.indexView);
/*
router.get("/users", usersController.index);

router.get("/users", usersController.getAllUsers,(req, res, next) => {
  res.render("users",{users: req.data});
});
*/


/*
router.get("/users/new", usersController.showSignUp);
router.post("/users/new",usersController.validate, usersController.saveUser,usersController.redirectView);
router.post("/users/create", usersController.create, usersController.redirectView);
*/
router.get("/users/:id/chatroomInvitations",usersController.loadUserById, usersController.chatroomInvitations, usersController.respondJSON);
router.get("/users/:id/chatroomInvitations/:id/join", usersController.join, usersController.respondJSON)

router.use(usersController.errorJSON);

router.get("/users/:id/chatrooms", usersController.loadUserById, usersController.chatroomsView);
router.get("/users/:id/edit", usersController.loadUserById, usersController.edit);
router.put("/users/:id/update", usersController.update,usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);
router.get("/users/:id",usersController.loadUserById,usersController.showView);




module.exports = router;
