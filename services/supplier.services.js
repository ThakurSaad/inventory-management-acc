const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({});
  const total = await Supplier.countDocuments();
  return { total, suppliers };
};

exports.getSupplierByIdService = async (SupplierId) => {
  const supplier = await Supplier.findOne({ _id: SupplierId });
  return supplier;
};

exports.updateSupplierByIdService = async (SupplierId, data) => {
  const result = await Supplier.updateOne({ _id: SupplierId }, data, {
    runValidators: true,
  });
  return result;
};
