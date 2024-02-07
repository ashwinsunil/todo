const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      due_date,
      priority,
      user: req.user.id, // Assign the user ID from req.user
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllUserTasks = async (req, res) => {
  try {
    const { priority, dueDate, page, limit } = req.query;
    const query = { user: req.user.id };
    console.log(query);
    // Apply filters
    if (priority) query.priority = priority;
    if (dueDate) query.due_date = dueDate;

    const tasks = await Task.find(query)
      .limit(limit ? parseInt(limit) : 10)
      .skip(page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0)
      .exec();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { due_date, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { due_date, status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() }, // Soft delete by adding timestamp
      { new: true }
    );
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
