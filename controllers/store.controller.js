const {
  createStoreService,
  getStoreService,
} = require("../services/store.services");

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Store created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Store not created",
      error: error.message,
    });
  }
};

exports.getStore = async (req, res, next) => {
  try {
    const stores = await getStoreService();

    res.status(200).json({
      status: "Success",
      message: "Stores found",
      stores: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Stores not found",
      error: error.message,
    });
  }
};
