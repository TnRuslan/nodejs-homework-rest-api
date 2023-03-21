const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/controller.js");
const { authMiddlewar } = require("./../../middlewares/authMiddlewar");
const {
  postSchema,
  putSchema,
  favoriteShema,
} = require("./../../service/validation");
const {
  validationMiddleware,
} = require("./../../middlewares/validationMiddleware");

const router = express.Router();

router.use(authMiddlewar);

router.get("/", async (req, res, next) => {
  try {
    const { limit = 20, page = 0, favorite } = req.query;

    let filter = {};

    if (favorite !== undefined) {
      filter.favorite = favorite;
    }

    filter.owner = req.user._id;

    const contacts = await listContacts(limit, page, filter);

    res.json({ contacts, limit, page, favorite });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(
      req.params.contactId,
      req.user._id
    );

    if (!contactById) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(contactById);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", validationMiddleware(postSchema), async (req, res, next) => {
  try {
    const newContact = await addContact(req.body, req.user._id);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId, req.user._id);

    if (result.deletedCount === 0) {
      res.status(400).json({ message: "Contact not found" });
      return;
    }

    res.json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put(
  "/:contactId",
  validationMiddleware(putSchema),
  async (req, res, next) => {
    try {
      const result = await updateContact(
        req.params.contactId,
        req.use._id,
        req.body
      );
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: "Not found" });
    }
  }
);

router.patch(
  "/:contactId/favorite",
  validationMiddleware(favoriteShema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { favorite = false } = req.body;
      const { owner } = req.user._id;

      const result = await updateStatusContact(contactId, owner, { favorite });
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: "Not found" });
    }
  }
);

module.exports = router;
