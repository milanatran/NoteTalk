const router = require("express").Router();
//const chatroomsController = require("../controllers/chatroomsController");
const usersController = require("../controllers/usersController");

// router.use(usersController.verifyToken);

router.post("/signIn", usersController.apiAuthenticate);
router.use(usersController.verifyJWT)
module.exports = router;
