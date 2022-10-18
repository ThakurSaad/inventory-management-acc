const Stock = require("../models/Stock");

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, stocks };
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("suppliedBy.id")
    .populate("brand.id");
  return stock;
};

exports.createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};

exports.updateStockByIdService = async (stockId, data) => {
  const result = await Stock.updateOne(
    { _id: stockId },
    { $inc: data },
    { runValidators: true }
  );

  return result;
};

exports.bulkUpdateStockService = async (data) => {
  const stocks = [];

  data.ids.forEach((stock) => {
    stocks.push(Stock.updateOne({ _id: stock.id }, stock.data));
  });

  const result = await Promise.all(stocks);
  return result;
};

exports.deleteStockByIdService = async (stockId) => {
  const result = await Stock.deleteOne({ _id: stockId });
  return result;
};

exports.bulkDeleteStockService = async (stockIds) => {
  const result = await Stock.deleteMany({});
  return result;
};
