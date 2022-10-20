const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authorization = require("../middleware/authorization");
const uploader = require("../middleware/uploader");
const { verifyToken } = require("../middleware/verifyToken");

router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(
    verifyToken,
    authorization("admin"),
    productController.deleteProductById
  );

module.exports = router;
