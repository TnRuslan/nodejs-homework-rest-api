const express = require("express");
const { registration, login } = require("./../../models/authcontroller");
const {
  validationMiddleware,
} = require("./../../middlewares/validationMiddleware");
const { authSchema } = require("./../../service/validation");

const router = express.Router();

router.post(
  "/registration",
  validationMiddleware(authSchema),
  async (req, res, next) => {
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
  }
);

router.post(
  "/login",
  validationMiddleware(authSchema),
  async (req, res, next) => {
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
  }
);

module.exports = { authRouter: router };
