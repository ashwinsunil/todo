const Subtask = require("../models/Subtask");

exports.createSubtask = async (req, res) => {
  try {
    const { task_id } = req.body;
    const newSubtask = new Subtask({
      task_id,
      status: 0, // Default status is incomplete
    });
    const savedSubtask = await newSubtask.save();
    res.status(201).json(savedSubtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateSubtask = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedSubtask = await Subtask.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedSubtask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteSubtask = async (req, res) => {
  try {
    const deletedSubtask = await Subtask.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() }, // Soft delete by adding timestamp
      { new: true }
    );
    res.status(200).json({ message: "Subtask deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
