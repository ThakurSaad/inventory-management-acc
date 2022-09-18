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
    const result = await createProductService();

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
