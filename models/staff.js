const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Staff = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { timestamps: true }
);

// Register the Staff model
module.exports = mongoose.models.Staff || mongoose.model("Staff", Staff);
