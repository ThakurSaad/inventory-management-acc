const {
  getStocksService,
  createStockService,
  bulkUpdateStockService,
  deleteStockByIdService,
  updateStockByIdService,
  bulkDeleteStockService,
} = require("../services/stock.services.js");

exports.getStocks = async (req, res, next) => {
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

    const stock = await getStocksService(filters, queries);

    res.status(200).json({
      status: "Success",
      message: "Data found",
      data: stock,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: "Can not get the data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Stock created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "Fail",
      message: "Stock can not be created",
      error: error.message,
    });
  }
};

exports.updateStockById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateStockByIdService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not update the Stock",
      error: error.message,
    });
  }
};

exports.bulkUpdateStock = async (req, res, next) => {
  try {
    const result = await bulkUpdateStockService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Data updated Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not bulk-update the Stock",
      error: error.message,
    });
  }
};

exports.deleteStockById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteStockByIdService(id);

    res.status(200).json({
      status: "Success",
      message: "Stock deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not delete the Stock",
      error: error.message,
    });
  }
};

exports.bulkDeleteStock = async (req, res, next) => {
  try {
    const result = await bulkDeleteStockService(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Fail",
        message: "Could not delete given Stocks",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Given Stocks deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Could not delete give Stocks",
      error: error.message,
    });
  }
};
