const {
  createCategoryService,
  getCategoryService,
} = require("../services/category.services");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Category could not be created",
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await getCategoryService();

    res.status(200).json({
      status: "Success",
      message: "Categories found",
      categories: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Categories could not be found",
      error: error.message,
    });
  }
};
