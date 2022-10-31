const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.post("/", UserController.login);
router.post("/users", UserController.register);
router.post("/verifikasi", UserController.verifikasi);

module.exports = router;
