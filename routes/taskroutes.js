const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Create task
router.post("/", authMiddleware, taskController.createTask);

// Get all user tasks
router.get("/", authMiddleware, taskController.getAllUserTasks);

// Update task
router.put("/:id", authMiddleware, taskController.updateTask);

// Delete task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
