import dbConnect from "../../../util/mongo";
const { verifyTokenAndAdmin } = require("../../../middlewares/verifyToken");
const {
  initializeWeeks,
} = require("../../../config/timeslot.config");

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
    try {
      const dayConfigs = req.body;

      // Call the initializeWeeks function with the dayConfigs
     await initializeWeeks(dayConfigs);

      // Send a success response
      res.status(200).json({ message: "Weeks initialized successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "An error occurred while creating a time slot.",
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
