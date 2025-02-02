const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    next();
  };
};

module.exports = validationMiddleware;
