import dbConnect from "../../../../util/mongo";
import Booking from "../../../../models/Booking";
import Week from "../../../../models/Week";
const { verifyTokenAndAdmin } = require("../../../../middlewares/verifyToken");
import moment from "moment";

const handler = async (req, res) => {
  const {
    method,
    query: { bookingId },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        throw new Error("Booking not found.");
      }

      const startDate = new Date(booking.startTime);
      const weekNumber = moment(startDate).isoWeek();

      console.log("startDate:", startDate);
      console.log("weekNumber:", weekNumber);

      const week = await Week.findOne({ weekNumber });
      if (!week) {
        throw new Error("Week not found.");
      }

      let foundTimeSlot;

      outerLoop: for (const day of week.days) {
        for (const timeSlot of day.timeSlots) {
          for (const staffAvailability of timeSlot.staffAvailability) {
            if (
              staffAvailability.booking &&
              staffAvailability.booking.toString() === bookingId
            ) {
              foundTimeSlot = timeSlot;
              break outerLoop;
            }
          }
        }
      }

      if (!foundTimeSlot) {
        return res.status(404).json({ message: "Time slot not found." });
      }

      res.status(200).json(foundTimeSlot);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while getting a time slot.",
        error: err,
      });
    }
  }
};

const handlerWrapper = (req, res) => {
  verifyTokenAndAdmin(req, res, () => {
    handler(req, res);
  });
};

export default handlerWrapper;
