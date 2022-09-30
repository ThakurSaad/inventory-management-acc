const Category = require("../models/Category");
// const

exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};
