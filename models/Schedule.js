const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Schedule = new Schema(
  {
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Schedule || mongoose.model("Schedule", Schedule);
