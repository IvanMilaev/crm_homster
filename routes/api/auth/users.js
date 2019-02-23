const express = require("express"),
  router = express.Router(),
  authController = require("../../../controllers/api/auth/auth.controller");

// @route POST api/auth/users/register
// @desc Register user
// @access Public
router.post("/register", authController.registerUser);

// @route POST api/auth/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", authController.loginUser);

module.exports = router;
