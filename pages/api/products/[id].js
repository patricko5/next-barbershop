import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired product wasn't found." });
    }
  }
  if (method == "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while updating the product." });
    }
  }
  if (method === "DELETE") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Successfully deleted the product" });
    } catch (err) {
      res
        .status(500)
        .json(err, { message: "The desired product wasn't found." });
    }
  }
};

export default handler;
