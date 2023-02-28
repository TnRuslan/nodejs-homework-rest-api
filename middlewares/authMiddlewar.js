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
    const decode = jwt.decode(token, JWT_SECRET);

    if (!decode) {
      res.status(401).json({ message: "Wrong token" });
      return;
    }

    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddlewar,
};
