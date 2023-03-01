const express = require("express");
const { registration, login } = require("./../../models/authcontroller");
const { authValidation } = require("./../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/registration", authValidation, async (req, res, next) => {
  try {
    const user = await registration(req.body);
    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.post("/login", authValidation, async (req, res, next) => {
  try {
    const { token, user } = await login(req.body);
    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(401).json({
      message: "Email or password is wrong",
    });
  }
});

module.exports = { authRouter: router };
