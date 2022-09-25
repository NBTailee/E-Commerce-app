const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      maxLength: [20, "title must be less than 20 chars"],
    },
    desc: {
      type: String,
      require: true,
      trim: true,
      maxLength: [300, "title must be less than 300 chars"],
    },
    img: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: Array,
      require: true,
    },
    size: {
      type: Array,
      require: true,
      trim: true,
    },
    color: {
      type: Array,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
