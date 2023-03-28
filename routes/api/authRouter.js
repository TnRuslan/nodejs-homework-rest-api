const express = require("express");
const {
  registration,
  login,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/authcontroller");
const { validationMiddleware } = require("../../middlewares");
const { authSchema, verifySchema } = require("../../service/validation");

const router = express.Router();

router.post("/registration", validationMiddleware(authSchema), registration);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/verify", validationMiddleware(verifySchema), resendVerifyEmail);

router.post("/login", validationMiddleware(authSchema), login);

module.exports = { authRouter: router };
