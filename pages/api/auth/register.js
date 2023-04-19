import dbConnect from "../../../util/mongo";
import Account from "../../../models/Account";
import Staff from "../../../models/staff";
const CryptoJS = require("crypto-js");
const { sendConfirmationEmail } = require("../../../config/nodemailer.config");
const { EmailToken } = require("../../../config/jwt.config");
const { verifyTokenAndAdmin } = require("/middlewares/verifyToken");
const {
  addStaffToAvailability,
} = require("../../../config/staffAvailability.config");

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method == "POST") {
    try {
      addStaffToAvailability;
      const {
        firstName,
        lastName,
        address,
        phoneNumber,
        username,
        email,
        password,
        img,
      } = req.body;

      // check if username or email already exists
      const existingAccount = await Account.findOne({
        $or: [{ username }, { email }],
      });
      if (existingAccount) {
        return res
          .status(400)
          .send({ error: "Username or email already in use" });
      }

      // encode password
      const hashedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASS_SEC
      ).toString();

      // create new account
      const account = await Account.create({
        username,
        email,
        password: hashedPassword,
        img,
      });

      // create staff information with account
      const staff = await Staff.create({
        firstName,
        lastName,
        address,
        phoneNumber,
        account: account._id,
      });

      // add staff availability
      addStaffToAvailability(staff._id);

      res.status(201).json(staff);

      // generate confirmation code
      //const confirmationCode = EmailToken(account._id);

      // send email verification
      //sendConfirmationEmail(firstName, email, account._id, confirmationCode);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};

const handlerWrapper = (req, res) => {
  verifyTokenAndAdmin(req, res, () => {
    handler(req, res);
  });
};

export default handlerWrapper;
