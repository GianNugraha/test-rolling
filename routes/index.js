const express = require("express");
const router = express.Router();
const errorHandlers = require("../middlewares/errorHandlers");
const giftRoutes = require("./gift");
const userRoutes = require("./user");


router.use("/gifts", giftRoutes);
router.use("/login", userRoutes);
router.use('/register', userRoutes);

router.use(errorHandlers);

module.exports = router;