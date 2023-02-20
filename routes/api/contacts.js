const express = require("express");
const hendler = require("../../models/contacts.js");
const { postSchema, putSchema } = require("./validation.js");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await hendler.listContacts();
    res.json({ contacts });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await hendler.getContactById(req.params.contactId);
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

    const newContact = await hendler.addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await hendler.removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = putSchema.validate(req.body);
    console.log(error);
    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }
    const result = await hendler.updateContact(req.params.contactId, req.body);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
