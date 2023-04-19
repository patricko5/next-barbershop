import dbConnect from "../../../util/mongo";
import Account from "../../../models/Account";
import Staff from "../../../models/staff";
import Schedule from "../../../models/Schedule";
import Week from "../../../models/Week";
const { verifyTokenAndAdmin } = require("../../../middlewares/verifyToken");

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const account = await Account.findById(id);
        return res.status(200).json(account);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    case "PUT":
      try {
        const account = await Account.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(account);
      } catch (error) {
        res.status(500).json(err);
      }

      break;

    case "DELETE":
      try {
        
        const staff = await Staff.findOne({ account: id });

        // Remove staff availability from the time slots
        await Week.updateMany(
          {},
          {
            $pull: {
              "days.$[].timeSlots.$[].staffAvailability": { staff: staff._id },
            },
          },
          {
            arrayFilters: [{ "timeSlot.staffAvailability.staff": staff._id }],
            multi: true,
          }
        );

        // Delete schedules related to the staff
        await Schedule.deleteMany({ barber: id });

        // remove staff and account
        await Staff.findOneAndDelete({ account: id });
        await Account.findByIdAndDelete(id);

        return res.status(200).json({ message: "account is deleted" });
      } catch (error) {
        res.status(500).json(error);
        console.error(error);
      }
      break;
  }
};

const handlerWrapper = (req, res) => {
  verifyTokenAndAdmin(req, res, () => {
    handler(req, res);
  });
};

export default handlerWrapper;
