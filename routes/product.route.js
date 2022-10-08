const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const multer = require("multer");

const uploader = multer({ dest: "images/" });

router.post(
  "/file-upload",
  uploader.single("image"),
  productController.fileUpload
);

// <input type="file" name="image" />;
// const formData = new FormData();
// formData.append("image", formData);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
