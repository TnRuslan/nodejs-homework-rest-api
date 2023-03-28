const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
require("dotenv").config();

const { User } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddlewar = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authMiddlewar;
