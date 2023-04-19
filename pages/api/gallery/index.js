import dbConnect from "../../../util/mongo";
import Gallery from "../../../models/gallery";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const galleries = await Gallery.find();
      res.status(200).json(galleries);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while retrieving gallery.",
        error: err,
      });
    }
  }

  if (method === "POST") {
    try {
      const gallery = await Gallery.create(req.body);
      res.status(201).json(gallery);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while creating a gallery.",
        error: err,
      });
    }
  }
};

export default handler;
