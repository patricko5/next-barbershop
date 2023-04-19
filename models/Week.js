const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffAvailability = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  isBooked: { type: Boolean, required: true, default: false },
});

const TimeSlot = new Schema({
  startTime: { type: Number, required: true },
  isFull: { type: Boolean, required: true, default: false },
  staffAvailability: [StaffAvailability],
});

const Day = new Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  timeSlots: [TimeSlot],
});

const Week = new Schema(
  {
    weekNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 52,
    },
    days: [Day],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Week || mongoose.model("Week", Week);
