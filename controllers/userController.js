const { cntrlWrapper } = require("../helpers");
const { User } = require("../models/userModel");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  ).select({ subscription: 1, email: 1 });

  res.json(result);
};

module.exports = {
  updateSubscription: cntrlWrapper(updateSubscription),
  logout: cntrlWrapper(logout),
  getCurrent: cntrlWrapper(getCurrent),
};
