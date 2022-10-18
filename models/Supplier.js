const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: [validator.isEmail, "Please provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    brand: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
      },
    },

    contactNumber: [
      {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid contact number",
        },
      },
    ],

    emergencyContactNumber: [
      {
        type: String,
        required: [true, "Please provide an emergency contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please provide a valid emergency contact number",
        },
      },
    ],

    tradeLicenseNumber: {
      type: String,
      required: [true, "Please provide your trade license number"],
    },

    presentAddress: {
      type: String,
      required: [true, "Please provide your present address"],
    },

    permanentAddress: {
      type: String,
      required: [true, "Please provide your permanent address"],
    },

    location: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "rajshahi",
          "chattogram",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "{VALUE} is not a correct division",
      },
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },

    nationalIdImageURL: {
      type: String,
      required: true,
      validate: [validator.isURL, "Please provide a valid url"],
    },

    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
