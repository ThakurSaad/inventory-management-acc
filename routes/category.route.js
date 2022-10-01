const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js");

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategory);

module.exports = router;
