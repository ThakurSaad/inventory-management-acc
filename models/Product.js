const mongoose = require("mongoose");

// schema design
const productSchema = mongoose.Schema(
  {
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre
productSchema.pre("save", function (next) {
  console.log("Before saving data");

  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }

  next();
});

// // mongoose middleware for saving data: post
// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");

//   next();
// });

// mongoose instance methods
productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// creating model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
