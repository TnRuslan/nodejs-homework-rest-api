const {
  authSchema,
  postSchema,
  putSchema,
  favoriteShema,
} = require("./../service/validation");

const authValidation = (req, res, next) => {
  const { error } = authSchema.validate(req.body);
  if (error) {
    error.message = "invalid email or password";
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

const postValidation = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  next();
};

const putValidation = (req, res, next) => {
  const { error } = putSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  next();
};

const patchFavoritValidation = (req, res, next) => {
  const { error } = favoriteShema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  next();
};

module.exports = {
  authValidation,
  postValidation,
  putValidation,
  patchFavoritValidation,
};
