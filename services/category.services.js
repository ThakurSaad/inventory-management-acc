const Category = require("../models/Category");

exports.createCategoryService = async (data) => {
  const category = await Category.create(data);
  return category;
};

exports.getCategoryService = async () => {
  const categories = await Category.find({});
  const total = await Category.countDocuments();
  return { total, categories };
};

exports.getCategoryByIdService = async (id) => {
  const category = await Category.findOne({ _id: id });
  return category;
};
