const express = require("express");
const {
  updateSubscription,
  logout,
  getCurrent,
} = require("../../controllers/userController.js");
const {
  validationMiddleware,
  upload,
  authMiddlewar,
} = require("../../middlewares");
const { subscriptionSchema } = require("../../service/validation");
const { updateAvatar } = require("../../controllers/fileController.js");

const router = express.Router();

router.use(authMiddlewar);

router.get("/current", getCurrent);

router.post("/logout", logout);

router.post(
  "/subscription",
  validationMiddleware(subscriptionSchema),
  updateSubscription
);

router.patch("/avatars", upload.single("avatar"), updateAvatar);

module.exports = {
  userRouter: router,
};
