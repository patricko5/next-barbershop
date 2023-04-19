const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model("Product", Product);
