const express = require("express");
const router = express.Router();
const { authController, loginController } = require("../controllers/auth");

router.route("/register").post(authController);
router.route("/login").post(loginController);

module.exports = router;
