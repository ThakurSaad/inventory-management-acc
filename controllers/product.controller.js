const Product = require("../models/Product.js");

exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.findById("6325a0c81e7a0ddea86416d2");

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
    // save
    // const product = new Product(req.body);

    // if (product.quantity == 0) {
    //   product.status = "out-of-stock";
    // }

    // const result = await product.save();

    // create
    const result = await Product.create(req.body);

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
