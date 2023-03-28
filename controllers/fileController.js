const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/userModel");
const Jimp = require("jimp");
const { cntrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatar", filename);

  await Jimp.read(resultUpload).then((file) => {
    return file.resize(250, 250).write(resultUpload);
  });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  updateAvatar: cntrlWrapper(updateAvatar),
};
