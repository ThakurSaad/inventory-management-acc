const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandsService = async () => {
  const brands = await Brand.find({}).populate("products");
  const total = await Brand.countDocuments();
  return { total, brands };
};

exports.getBrandByIdService = async (brandId) => {
  const brand = await Brand.findOne({ _id: brandId }).populate("products");
  return brand;
};

exports.updateBrandByIdService = async (brandId, data) => {
  const result = await Brand.updateOne({ _id: brandId }, data, {
    runValidators: true,
  });
  console.log(result);
  return result;
};
