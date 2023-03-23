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

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifySchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  postSchema,
  putSchema,
  favoriteShema,
  authSchema,
  subscriptionSchema,
  verifySchema,
};
