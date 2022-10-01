const Store = require("../models/Store");

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreService = async () => {
  const stores = await Store.find({});
  const total = await Store.countDocuments();
  return { total, stores };
};
