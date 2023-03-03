const express = require("express");
const { User } = require("../../models/schemas/userModule.js");
const { authMiddlewar } = require("./../../middlewares/authMiddlewar.js");
const { logout } = require("./../../models/authcontroller");
const { updateSubscription } = require("./../../models/userController.js");
const {
  validationMiddleware,
} = require("./../../middlewares/validationMiddleware");
const { subscriptionSchema } = require("./../../service/validation");

const router = express.Router();

router.use(authMiddlewar);

router.get("/current", async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, subscription } = await User.findById(_id);

    res.status(200).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const token = await logout(_id);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/subscription",
  validationMiddleware(subscriptionSchema),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { subscription } = req.body;

      const result = await updateSubscription(_id, { subscription });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  userRouter: router,
};
