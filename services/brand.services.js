const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async () => {
  const brands = await Brand.find({}).select("-products -suppliers");
  const total = await Brand.countDocuments();
  return { total, brands };
};

exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findOne({ _id: id });
  return brand;
};
