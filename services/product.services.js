const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};
