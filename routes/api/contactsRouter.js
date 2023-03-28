const express = require("express");
const {
  getAll,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");
const { authMiddlewar, validationMiddleware } = require("../../middlewares");
const {
  postSchema,
  putSchema,
  favoriteShema,
} = require("../../service/validation");

const router = express.Router();

router.use(authMiddlewar);

router.get("/", getAll);

router.get("/:contactId", getContactById);

router.post("/", validationMiddleware(postSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationMiddleware(putSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  validationMiddleware(favoriteShema),
  updateStatusContact
);

module.exports = {
  contactsRouter: router,
};
