const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierByIdService,
} = require("../services/supplier.services");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Supplier created Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: "Supplier could not be created",
      error: error.message,
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersService();

    res.status(200).json({
      status: "Success",
      message: "Suppliers found",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Suppliers could not be found",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: "Fail",
        error: `Supplier could not be found for id ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Supplier found for this id",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Supplier could not be found for this id",
      error: error.message,
    });
  }
};

exports.updateSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateSupplierByIdService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "Fail",
        error: `Supplier could not be updated for id ${id}`,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Supplier updated for this id",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Supplier could not be updated for this id",
      error: error.message,
    });
  }
};
