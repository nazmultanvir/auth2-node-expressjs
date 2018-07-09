const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

// login
router.post("/login", authController.auth_login);

// signup
router.post("/signup", authController.auth_signup);

//All User
router.get("/user", authController.auth_userinfo);

module.exports = router;
