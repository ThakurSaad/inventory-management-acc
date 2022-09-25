const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a store name"],
      lowercase: true,
      enum: {
        values: [
          "Dhaka",
          "Chattogram",
          "Rajshahi",
          "Khulna",
          "Barishal",
          "Sylhet",
          "Rangpur",
          "Mymensingh",
        ],
        message: "{VALUE} is not a valid name",
      },
    },

    description: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamp: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

exports = Store;
