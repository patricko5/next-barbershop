import dbConnect from "../../../util/mongo";
import Service from "../../../models/Service";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      const service = await Service.findById(id);
      res.status(200).json(service);
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired service wasn't found." });
    }
  }
  if (method == "PUT") {
    try {
      const service = await Service.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(service);
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while updating the service." });
    }
  }
  if (method === "DELETE") {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found." });
      }
      await Service.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted the service" });
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired service wasn't found." });
    }
  }
};
export default handler;
