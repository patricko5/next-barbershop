const jwt = require("jsonwebtoken");

const AccessToken = (username, role) => jwt.sign(
  {
    username: username,
    role: role,
  },
  process.env.JWT_SEC,
  { expiresIn: "30d" }
);

const EmailToken = (id) => jwt.sign(
  {
    userId: id
  },
  process.env.JWT_SEC,
  { expiresIn: "3d" }
)

module.exports = {AccessToken, EmailToken};
