const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
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

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "Fail",
        error: `Brand could not be found for id ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Brand found for this id",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Brand could not be found for this id",
      error: error.message,
    });
  }
};
