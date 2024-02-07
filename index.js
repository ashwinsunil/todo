const express = require("express");
const mongoose = require("mongoose");
const cronJobs = require("./cronJobs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://ashwinskumar01:1@ecommerce.lygo8zf.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes
const taskRoutes = require("./routes/taskroutes");
const subtaskRoutes = require("./routes/subtaskRoutes");
const authRoutes = require("./routes/authRoutes");
const voiceCallRouter = require("./routes/twilioRoutes");
app.use("/api/login", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/subtasks", subtaskRoutes);
app.use("/", voiceCallRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  cronJobs.start();
});
