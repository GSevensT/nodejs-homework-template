import express from 'express';
import { 
  listContacts, 
  getContactById, 
  addContact, 
  removeContact, 
  updateContact 
} from '../../models/contacts.js'; // Ensure the path is correct

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// corresponds to removeContact
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Contact deleted" }); // Send a message instead of the result
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const result = await updateContact(req.params.contactId, req.body);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router; // Use export default for ES module
