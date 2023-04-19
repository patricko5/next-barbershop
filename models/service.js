const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Service = new Schema(
  {
    serviceName: {
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

module.exports = mongoose.models.Service || mongoose.model("Service", Service);
