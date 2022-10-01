const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

exports.getCategoryService = async () => {
  const category = await Category.find({});
  const total = await Category.countDocuments();
  return { total, category };
};
