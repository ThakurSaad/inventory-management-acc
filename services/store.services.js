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

exports.getStoreByIdService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};

exports.updateStoreByIdService = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
