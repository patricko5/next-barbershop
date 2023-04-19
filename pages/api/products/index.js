import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while retrieving products.",
        error: err,
      });
    }
  }

  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({
        message: "An error occurred while creating a product.",
        error: err,
      });
    }
  }
};


export default handler;
