import dbConnect from "../../../util/mongo";
import Booking from "../../../models/Booking";
import Schedule from "../../../models/Schedule";
import Week from "../../../models/Week";
import moment from "moment";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      const booking = await Booking.findById(id);
      res.status(200).json(booking);
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired booking wasn't found." });
    }
  }
  if (method == "PUT") {
    try {
      const booking = await Booking.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(booking);
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while updating the booking." });
    }
  }
  if (method === "DELETE") {
    try {
      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found." });
      }

      const startDate = new Date(booking.startTime);
      const weekNumber = moment(startDate).isoWeek();
      const dayOfWeek = startDate.getDay() === 0 ? 6 : startDate.getDay() - 1;

      const week = await Week.findOne({ weekNumber });
      if (!week) {
        return res.status(404).json({ message: "Week not found." });
      }

      const day = week.days[dayOfWeek];

      let staffAvailabilityUpdated = false;
      for (const timeSlot of day.timeSlots) {
        for (const staffAvailability of timeSlot.staffAvailability) {
          if (
            staffAvailability.booking &&
            staffAvailability.booking.toString() === id
          ) {
            staffAvailability.isBooked = false;
            staffAvailability.booking = null;

            // Update isFull for the timeSlot if necessary
            if (timeSlot.isFull) {
              timeSlot.isFull = timeSlot.staffAvailability.every(
                (availability) => availability.isBooked
              );
            }

            staffAvailabilityUpdated = true;
            break;
          }
        }

        if (staffAvailabilityUpdated) {
          break;
        }
      }

      if (staffAvailabilityUpdated) {
        await week.save();
      } else {
        return res
          .status(404)
          .json({ message: "Staff availability not found." });
      }

      // Remove the booking from the staff's schedule
      await Schedule.findOneAndUpdate(
        { bookings: booking._id },
        { $pull: { bookings: booking._id } }
      );

      // Delete the booking
      await Booking.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted the booking" });
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired booking wasn't found." });
    }
  }
};
export default handler;
