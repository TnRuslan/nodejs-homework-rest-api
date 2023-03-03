const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddlewar = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const [tokenType, token] = authorizationHeader.split(" ");

  if (!token) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  try {
    const verify = jwt.verify(token, JWT_SECRET);

    if (!verify) {
      res.status(401).json({ message: "Wrong token" });
      return;
    }

    req.user = verify;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddlewar,
};
