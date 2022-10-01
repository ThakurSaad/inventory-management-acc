const mongoose = require("mongoose");
const validator = require("validator");
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
          "dhaka",
          "chattogram",
          "rajshahi",
          "khulna",
          "barishal",
          "sylhet",
          "rangpur",
          "mymensingh",
        ],
        message:
          "{VALUE} is not a valid name. Must be dhaka / chattogram / rajshahi / khulna / barishal / sylhet / rangpur / mymensingh",
      },
    },

    description: { type: String },

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
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
