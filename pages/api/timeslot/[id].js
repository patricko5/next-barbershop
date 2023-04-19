import dbConnect from "../../../util/mongo";
import Week from "../../../models/Week";
import Staff from "../../../models/staff";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const week = await Week.findOne({ "days.timeSlots._id": id })
          .populate({
            path: "days.timeSlots.staffAvailability.staff",
            model: Staff,
          })
          .exec();

        if (!week) {
          return res.status(400).json({ success: false });
        }

        const day = week.days.find((day) =>
          day.timeSlots.some((timeSlot) => timeSlot._id.toString() === id)
        );

        if (!day) {
          return res.status(400).json({ success: false });
        }

        const timeSlot = day.timeSlots.find(
          (timeSlot) => timeSlot._id.toString() === id
        );

        if (!timeSlot) {
          return res.status(400).json({ success: false });
        }

        const staffAvailabilities = timeSlot.staffAvailability.map(
          (availability) => ({
            _id: availability._id,
            staff: availability.staff,
            isBooked: availability.isBooked,
          })
        );

        res.status(200).json(staffAvailabilities);
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
