import dbConnect from "../../../../util/mongo";
import Staff from "../../../../models/staff";

const handler = async (req, res) => {
  const {
    method,
    query: { accountId },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const staff = await Staff.findOne({ account: accountId });
        return res.status(200).json(staff);
      } catch (err) {
        res.status(500).json(err);
      }
      break;
  }
};

export default handler;
