const express = require("express");
const { User } = require("../../models/schemas/userModule.js");
const { authMiddlewar } = require("./../../middlewares/authMiddlewar.js");

const router = express.Router();

router.get("/current", authMiddlewar, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, subscription } = await User.findById(_id);

    res.status(200).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  userRouter: router,
};
