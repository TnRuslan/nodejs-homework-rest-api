const express = require("express");
const { registration, login } = require("./../../models/authcontroller");
const { authSchema } = require("./../../service/validation");

const router = express.Router();

router.post("/registration", async (req, res, next) => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      error.message = "invalid email or password";
      res.status(400).json({ message: error.message });
      return;
    }

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

router.post("/login", async (req, res, next) => {
  try {
    const { error } = authSchema.validate(req.body);
    if (error) {
      error.message = "invalid email or password";
      res.status(400).json({ message: error.message });
      return;
    }

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
