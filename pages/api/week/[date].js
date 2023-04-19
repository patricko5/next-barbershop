import dbConnect from "../../../util/mongo";
import Week from "../../../models/Week";
import moment from "moment";

const handler = async (req, res) => {
  const { method, query } = req;
  const { date } = query;

  await dbConnect();

  if (method === "GET") {
    try {
      const selectedDate = new Date(date);
      const weekNumber = moment(selectedDate).isoWeek();

      const dayOfWeek = selectedDate.getDay();

      const weekDocument = await Week.findOne({ weekNumber });

      if (!weekDocument) {
        return res.status(404).json({ message: "Week not found" });
      }

      const dayDocument = weekDocument.days.find(
        (day) => day.day === getDayOfWeekName(dayOfWeek)
      );

      if (!dayDocument) {
        return res.status(404).json({ message: "Day not found" });
      }

      const timeSlots = dayDocument.timeSlots.map((timeSlot) => ({
        _id: timeSlot._id,
        startTime: timeSlot.startTime,
        isFull: timeSlot.isFull,
        staffAvailability: timeSlot.staffAvailability,
      }));

      res.status(200).json(timeSlots);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while fetching time slots.",
        error: err,
      });
    }
  }
};

// Helper function to get the name of the day of the week
const getDayOfWeekName = (dayOfWeek) => {
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayOfWeekNames[dayOfWeek];
};

export default handler;
