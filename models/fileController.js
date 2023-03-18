const path = require("path");
const fs = require("fs/promises");
const { User } = require("./schemas/userModule");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../public/avatars");

const updateAvatar = () => {
  return async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  updateAvatar,
};
