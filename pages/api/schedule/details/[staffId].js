import dbConnect from "../../../../util/mongo";
import Schedule from "../../../../models/Schedule";
import Booking from "../../../../models/Booking";

const handler = async (req, res) => {
  const { method, query } = req;

  await dbConnect();

  if (method === "GET") {
    const { staffId } = query;

    if (!staffId) {
      return res.status(400).json({ message: "Missing staffId in the query." });
    }

    try {
      const schedule = await Schedule.findOne({ staff: staffId })
        .populate({
          path: "bookings",
          model: Booking,
        })
        .exec();

      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found." });
      }

      // Get the bookings from the schedule
      const bookings = schedule.bookings;
      res.status(200).json(bookings);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the bookings." });
    }
  }
};

export default handler;
