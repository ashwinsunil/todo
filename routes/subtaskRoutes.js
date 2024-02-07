const express = require("express");
const router = express.Router();
const subtaskController = require("../controllers/subtaskController");
const authMiddleware = require("../middleware/authMiddleware");

// Create subtask
router.post("/", authMiddleware, subtaskController.createSubtask);

// Update subtask
router.put("/:id", authMiddleware, subtaskController.updateSubtask);

// Delete subtask
router.delete("/:id", authMiddleware, subtaskController.deleteSubtask);
module.exports = router;
