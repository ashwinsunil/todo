const express = require("express");
const mongoose = require("mongoose");
const cronJobs = require("./cronJobs");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const taskRoutes = require("./routes/taskroutes");
const subtaskRoutes = require("./routes/subtaskRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/login", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subtasks", subtaskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  cronJobs.start();
});
