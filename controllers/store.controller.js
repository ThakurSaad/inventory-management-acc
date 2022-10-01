const {
  createStoreService,
  getStoreService,
  getStoreByIdService,
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

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);

    if (!store) {
      return res.status(400).json({
        status: "Fail",
        error: `Store not found for id ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: `Store found for id ${id}`,
      store: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Stores not found for this id",
      error: error.message,
    });
  }
};
