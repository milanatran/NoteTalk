const router = require("express").Router(),
 chatroomsController = require("../controllers/chatroomsController");
router.get("/chatrooms", chatroomsController.index, chatroomsController.respondJSON);
router.use(chatroomsController.errorJSON);
module.exports = router;
