const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

// router.route("/bulk-update").patch(productController.bulkUpdateProduct);
// router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router
  .route("/:id")
  .patch(stockController.updateStockById)
  .delete(stockController.deleteStockById);

module.exports = router;