const { Contact } = require("./schemas/contact");

const listContacts = async (limit, page, filter) => {
  return Contact.find(filter)
    .select({ __v: 0 })
    .skip(page * limit)
    .limit(limit);
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId }).select({ __v: 0 });
};

const removeContact = async (contactId) => {
  return Contact.remove({ _id: contactId });
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
