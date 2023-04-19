import dbConnect from "../../../util/mongo";
import Booking from "../../../models/Booking";
import Week from "../../../models/Week";
import Schedule from "../../../models/Schedule";
import { checkAndUpdateIsFull } from "../../../config/staffAvailability.config";
const { convertToHours } = require("../../../config/convertToHours.config");
import moment from "moment";
import { EventEmitter } from "events";

export const bookingCreatedEvent = new EventEmitter();

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while retrieving bookings.",
        error: err,
      });
    }
  }

  if (method == "POST") {
    try {
      const {
        startTime,
        endTime,
        service,
        barber,
        customerName,
        customerEmail,
        customerPhone,
        notes,
      } = req.body;

      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
      const weekNumber = moment(startDate).isoWeek();
      const dayOfWeek = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1; // 0 (Monday) to 6 (Sunday)

      const week = await Week.findOne({ weekNumber });
      if (!week) {
        return res.status(404).json({ message: "Week not found." });
      }

      const day = week.days[dayOfWeek];
      const startHour = convertToHours(startTime);
      const endHour = convertToHours(endTime);

      const targetTimeSlot = day.timeSlots.find(
        (slot) => slot.startTime >= startHour && slot.startTime < endHour
      );

      if (!targetTimeSlot) {
        return res.status(404).json({ message: "Time slot not found." });
      }

      const staffAvailability = targetTimeSlot.staffAvailability.find(
        (availability) => availability.staff.toString() === barber
      );

      if (!staffAvailability || staffAvailability.isBooked) {
        return res.status(400).json({
          message: "Staff is not available for the selected time slot.",
        });
      }

      if (targetTimeSlot.isFull) {
        return res
          .status(400)
          .json({ message: "The time slot is fully booked." });
      }

      const booking = await Booking.create(req.body);

      // Find the index of the target time slot
      const targetTimeSlotIndex = day.timeSlots.findIndex(
        (slot) => slot.startTime >= startHour && slot.startTime < endHour
      );

      // Find the index of the staff availability
      const staffAvailabilityIndex = targetTimeSlot.staffAvailability.findIndex(
        (availability) => availability.staff.toString() === barber
      );

      week.days[dayOfWeek].timeSlots[targetTimeSlotIndex].staffAvailability[
        staffAvailabilityIndex
      ].isBooked = true;
      week.days[dayOfWeek].timeSlots[targetTimeSlotIndex].staffAvailability[
        staffAvailabilityIndex
      ].booking = booking._id;

      // After updating staffAvailability
      checkAndUpdateIsFull(targetTimeSlot);

      week.markModified("days"); // Mark the 'days' path as modified
      await week.save();

      // Update staff schedule
      let staffSchedule = await Schedule.findOne({ staff: barber });
      if (!staffSchedule) {
        staffSchedule = new Schedule({ staff: barber });
      }
      staffSchedule.bookings.push(booking._id);
      await staffSchedule.save();

      // Emit the booking created event
      bookingCreatedEvent.emit("created", booking);

      res.status(201).json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while creating a booking.",
        error: err,
      });
    }
  }
};

export default handler;
