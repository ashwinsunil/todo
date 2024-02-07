const cron = require("node-cron");
const Task = require("./models/Task");
const User = require("./models/User");
const twilio = require("twilio");
require("dotenv/config");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// Cron job to change task priorities based on due_date
const cronJobs = {
  start: () => {
    // Cron job to change task priorities based on due_date
    cron.schedule("0 0 * * *", async () => {
      try {
        const tasksToUpdate = await Task.find({
          due_date: { $lt: new Date() }, // Find tasks with due dates in the past
        });

        tasksToUpdate.forEach(async (task) => {
          // Logic to update task priorities based on due_date
          // You can adjust this logic based on your requirements
          // Example: Update priority to 2 if due_date is more than 5 days ago
          let priority = 0; // Default priority

          // Calculate the difference in days between the due date and the current date
          const currentDate = new Date();
          const differenceInDays = Math.floor(
            (dueDate - currentDate) / (1000 * 60 * 60 * 24)
          );

          // Assign priority based on the difference in days
          if (differenceInDays === 0) {
            priority = 0; // Due date is today
          } else if (differenceInDays === 1 || differenceInDays === 2) {
            priority = 1; // Due date is between tomorrow and day after tomorrow
          } else if (differenceInDays <= 4) {
            priority = 2; // Due date is within the next 4 days
          } else {
            priority = 3; // Due date is 5 or more days away
          }
          try {
            // Update the priority of the task in the database
            await Task.findByIdAndUpdate(taskId, { priority });
            console.log(`Priority updated for task ${taskId}: ${priority}`);
          } catch (error) {
            console.error(`Error updating priority for task ${taskId}:`, error);
          }
        });
      } catch (error) {
        console.error("Error updating task priorities:", error);
      }
    });

    // Cron job for voice calling using Twilio
    cron.schedule("33 15 * * *", async () => {
      try {
        // Fetch users based on priority order
        const users = await User.find().sort({ priority: 1 });

        // Iterate through users and attempt to make voice calls
        for (const user of users) {
          try {
            // Logic to check if the user has overdue tasks and make a voice call
            const overdueTasks = await Task.find({
              user: user._id,
              due_date: { $lt: new Date() },
            });

            if (overdueTasks.length > 0) {
              // Make voice call using Twilio
              await client.calls.create({
                to: user.phone_number,
                from: process.env.PHONE_NO,
                url: "http://demo.twilio.com/docs/voice.xml",
                method: "POST",
              });

              // Break the loop if a call is successfully made
              break;
            }
          } catch (callError) {
            console.error("Error making Twilio voice call:", callError);
          }
        }
      } catch (error) {
        console.error("Error fetching users for voice calls:", error);
      }
    });
  },
};

module.exports = cronJobs;
