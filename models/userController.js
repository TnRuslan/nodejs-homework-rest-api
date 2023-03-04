const { User } = require("./schemas/userModule");

const updateSubscription = async (id, body) => {
  return User.findOneAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  updateSubscription,
};
