const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");

router.post("/", brandController.createBrand);

module.exports = router;
