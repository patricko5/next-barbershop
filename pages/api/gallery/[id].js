import dbConnect from "../../../util/mongo";
import Gallery from "../../../models/gallery";

const handler = async (req, res) => {
    const {
      method,
      query: { id },
    } = req;
  
    await dbConnect();
  
    if (method == "GET") {
      try {
        const gallery = await Gallery.findById(id);
        res.status(200).json(gallery);
      } catch (err) {
        res
          .status(500)
          .json(err, { message: "The desired product wasn't found." });
      }
    }
    if (method == "PUT") {
      try {
        const gallery = await Gallery.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(gallery);
      } catch (err) {
        res
          .status(500)
          .json({ message: "An error occurred while updating the product." });
      }
    }
    if (method === "DELETE") {
      try {
        const gallery = await Gallery.findById(id);
        if (!gallery) {
          return res.status(404).json({ message: "Product not found." });
        }
        await Gallery.findByIdAndDelete(id);
        res.status(200).json({ message: "Successfully deleted the product" });
      } catch (err) {
        res
          .status(500)
          .json(err, { message: "The desired product wasn't found." });
      }
    }
  };
  
  export default handler;