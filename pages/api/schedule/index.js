import dbConnect from "../../../util/mongo";
import Schedule from "../../../models/Schedule";
const {verifyTokenAndAdmin} = require("../../../middlewares/verifyToken")

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      const schedules = await Schedule.find();
      res.status(200).json(schedules);
    } catch (err) {
      res.status(500).json(err);
    }
  }

};

const handlerWrapper = (req, res) => {
  verifyTokenAndAdmin(req, res, () => {
    handler(req, res);
  }) };

export default handlerWrapper;