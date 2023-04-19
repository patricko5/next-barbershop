import dbConnect from "../../../../../util/mongo";
import jwt from "jsonwebtoken";
import Account from "../../../../../models/Account";

const handler = async (req, res) => {

  const {
    method,
    query: { staffId, token },
  } = req;

  await dbConnect();

  if (method == "GET") {
    try {
      // Verify the confirmation code
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      if (decoded.userId !== staffId) {
        return res.status(400).send({ error: "Invalid confirmation code" });
      }

      // update isVerified to true
      const account = await Account.findOneAndUpdate(
        { _id: staffId },
        { $set: { isVerified: true } },
        { new: true }
      );

      if (!account) {
        return res.status(400).send({ error: "Invalid account" });
      }

      res.status(200).json({ verifySuccess: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
};

export default handler;
