import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  if (method === "POST") {
    try {
      res.setHeader("Set-Cookie", `token= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; HttpOnly; Path=/`);
      res.status(200).json({ message: "User logged out" });
      console.log("User is logged out successfully >>");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error logging out" });
    }
  }
};

export default handler;
