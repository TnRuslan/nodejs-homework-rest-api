const Joi = require("joi");

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})
  .required()
  .max(3);

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .required()
  .min(1)
  .max(3);

const favoriteShema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  postSchema,
  putSchema,
  favoriteShema,
};
