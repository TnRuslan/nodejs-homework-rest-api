const { User } = require("./schemas/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../helpers/sendEmail");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const { BASE_URL } = process.env;

const registration = async ({ email, password }) => {
  try {
    const verificationCode = uuidv4();
    const avatarURL = gravatar.url(email);

    const user = await User.create({
      email,
      password,
      avatarURL,
      verificationCode,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`,
    };

    await sendEmail(verifyEmail);

    return user;
  } catch (error) {
    return Promise.reject(new Error("invalid email"));
  }
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Wrong password");
  }

  if (!user.verify) {
    throw new Error("Email not verify");
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });

  return { token, user };
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;

  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw new Error("email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({ message: "Email verify success" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email not found");
  }

  if (user.verify) {
    throw new Error("Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

const logout = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1ms" });
  return token;
};

module.exports = {
  registration,
  login,
  logout,
  verifyEmail,
  resendVerifyEmail,
};
