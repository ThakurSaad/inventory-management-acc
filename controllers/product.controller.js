const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
} = require("../services/product.services.js");

exports.getProducts = async (req, res, next) => {
  try {
    const product = await getProductsService();

    res.status(200).json({
      status: "Success",
      message: "Data found",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can not get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // create
    const result = await createProductService(req.body);

    result.logger();

    res.status(200).json({
      status: "Success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "Fail",
      message: "Data not inserted",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Product.updateOne({ _id: id }, { $set: req.body });

    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not update the product",
      error: error.message,
    });
  }
};
