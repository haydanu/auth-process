const express = require("express");

const userController = require("../controllers/User");
const userAuth = require("../middleware/auth");

const { signup, login } = userController;
const router = express.Router();

router.post("/signup", userAuth.saveUser, signup);
router.post("/login", login);

module.exports = router;
