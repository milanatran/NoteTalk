const router = require("express").Router(),
 userRoutes = require("./userRoutes"),
 errorRoutes = require("./errorRoutes"),
 homeRoutes = require("./homeRoutes");
const apiRoutes = require("./apiRoutes");

router.use("/", userRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
