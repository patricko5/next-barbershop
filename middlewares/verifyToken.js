import jwt from "jsonwebtoken";

// verify access token
const verifyToken = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];

  if (!token) {
    return res.status(401).send({ error: "Access Denied. No token provided." });
  }

  try {
    jwt.verify(token, process.env.JWT_SEC, (err, account) => {
      if (err) res.status(403).json("Token is not valid!");
      req.account = account;
      next();
    });
  } catch (error) {
    return res.status(400).send({ error: "Invalid token." });
  }
};

// verify staff access
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.account.id === req.params.id || req.account.role === "admin") {
      next();
    } else {
      res.status(403).json("Uauthorized Access Denied.");
    }
  });
};

// verify admin access
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.account?.role === "admin") {
      next();
    } else {
      res.status(403).json("Uauthorized Access Denied.");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
