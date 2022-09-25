const {
  createBrandService,
  getBrandsService,
} = require("../services/brand.services");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Brand created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Brand could not be created",
      error: error.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandsService();

    res.status(200).json({
      status: "Success",
      message: "Brands found",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Brand could not be found",
      error: error.message,
    });
  }
};
