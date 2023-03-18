const { User } = require("./schemas/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const registration = async ({ email, password }) => {
  try {
    const avatarURL = gravatar.url(email);
    const user = await User.create({ email, password, avatarURL });
    return user;
  } catch (error) {
    return Promise.reject(new Error("invalid email"));
  }
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return new Error();
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return new Error();
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });

  return { token, user };
};

const logout = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1ms" });
  return token;
};

module.exports = {
  registration,
  login,
  logout,
};
