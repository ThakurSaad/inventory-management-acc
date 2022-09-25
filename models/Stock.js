const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// const validator = require('validator')

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },

    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      lowercase: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can not be value, must be kg/liter/pcs",
      },
    },

    imageURL: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) return false;

            let isValid = true;

            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });

            return isValid;
          },
          message: "Please provide valid image URLs",
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: [0, "Product price can not be negative"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can not be negative"],
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can not be {VALUE}",
      },
    },

    store: {
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

      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a supplier name"],
      },

      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  console.log("Before saving data");

  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

const Stock = mongoose.model("Stock", stockSchema);

exports = Stock;
