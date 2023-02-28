const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/controller.js");
const {
  postSchema,
  putSchema,
  favoriteShema,
} = require("./../../service/validation.js");
const { authMiddlewar } = require("./../../middlewares/authMiddlewar");

const router = express.Router();

router.use(authMiddlewar);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    res.json(contactById);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const result = await updateContact(req.params.contactId, req.body);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = favoriteShema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }

    const { contactId } = req.params;
    const { favorite = false } = req.body;

    const result = await updateStatusContact(contactId, { favorite });
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
