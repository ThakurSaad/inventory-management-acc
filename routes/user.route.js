const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/signup", userController.singUp);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
