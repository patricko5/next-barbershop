import dbConnect from "../../../util/mongo";
import Service from "../../../models/Service";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while retrieving services.",
        error: err,
      });
    }
  }

  if (method === "POST") {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while creating a service.",
        error: err,
      });
    }
  }
};

export default handler;
