const {
  getProductsService,
  createProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  updateProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services.js");

exports.getProducts = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((field) => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte|eq)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * parseInt(limit);

      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const product = await getProductsService(filters, queries);

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

    // result.logger();

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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateProductByIdService(id, req.body);

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

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not bulk-update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Fail",
        message: "Could not delete given products",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Given products deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not delete give products",
      error: error.message,
    });
  }
};

exports.fileUpload = async (req, res) => {
  try {
    res.status(200).json(req.files);
  } catch (error) {
    console.log(error);
  }
};
