import dbConnect from "../../../util/mongo";
import Week from "../../../models/Week";
const { verifyTokenAndAdmin } = require("../../../middlewares/verifyToken");

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      // Fetch all weeks from the database
      const weeks = await Week.find();

      // Send the weeks as a JSON response
      res.status(200).json(weeks);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while fetching weeks.",
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
