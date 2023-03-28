const { cntrlWrapper, HttpError } = require("../helpers");
const { Contact } = require("../models/contactModel");

const getAll = async (req, res) => {
  const { limit = 20, page = 0, favorite } = req.query;

  const filter = {};

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  filter.owner = req.user._id;

  const result = await Contact.find(filter)
    .select({ __v: 0, owner: 0 })
    .skip(page * limit)
    .limit(limit);

  res.json({ result, limit, page, favorite });
};

const getContactById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById({ _id, owner }).select({
    __v: 0,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ result });
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId: _id } = req.params;

  const result = await Contact.findOneAndRemove({ _id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
    new: true,
  }).select({ __v: 0 });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body, {
    new: true,
  }).select({ __v: 0 });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getContactById: cntrlWrapper(getContactById),
  removeContact: cntrlWrapper(removeContact),
  addContact: cntrlWrapper(addContact),
  updateContact: cntrlWrapper(updateContact),
  updateStatusContact: cntrlWrapper(updateStatusContact),
};
