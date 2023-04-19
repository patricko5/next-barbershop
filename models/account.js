const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff"],
      required: true,
      default: "staff",
    },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Account || mongoose.model('Account', Account)