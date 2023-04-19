import dbConnect from "../../../util/mongo";
import Staff from "../../../models/staff";
const { verifyTokenAndAdmin } = require("../../../middlewares/verifyToken");

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const staffs = await Staff.find();
      res.status(200).json(staffs);
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (method === "POST") {
    try {
      const staff = await Staff.create(req.body);
      res.status(201).json(staff);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while creating a staff.",
        error: err,
      });
    }
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
};

const handlerWrapper = (req, res) => {
  verifyTokenAndAdmin(req, res, () => {
    handler(req, res);
  });
};

export default handlerWrapper;
