const { Contact } = require("./schemas/contact");

const listContacts = async (limit, page, filter) => {
  return Contact.find(filter)
    .select({ __v: 0, owner: 0 })
    .skip(page * limit)
    .limit(limit);
};

const getContactById = async (contactId, owner) => {
  return Contact.findOne({ _id: contactId, owner }).select({ __v: 0 });
};

const removeContact = async (contactId, owner) => {
  return Contact.remove({ _id: contactId, owner });
};

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  return Contact.create({ name, email, phone, owner });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateStatusContact = async (id, owner, body) => {
  return Contact.findByIdAndUpdate({ _id: id, owner }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
