const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.js");

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategory);

router.route("/:id").get(categoryController.getCategoryById);

module.exports = router;
