const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const memberRoutes = require("./routes/members");
const roleRoutes = require("./routes/roles");
const dashboardRoutes = require("./routes/dashboard");
const activityLogRoutes = require("./routes/activity-logs");
const controlPanelRoutes = require("./routes/control-panel");
const authenticate = require("./middleware/auth");
const logActivity = require("./middleware/logActivity");

const initializeDatabase = require("./database/init");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/control-panel", controlPanelRoutes);

app.use("/members", authenticate, logActivity, memberRoutes);
app.use("/roles", authenticate, logActivity, roleRoutes);
app.use("/dashboard", authenticate, logActivity, dashboardRoutes);
app.use("/activity-logs", authenticate, logActivity, activityLogRoutes);

const killPortProcess = (port) => {
  return new Promise((resolve, reject) => {
    exec(`netstat -tuln | grep :${port}`, (err, stdout, stderr) => {
      if (err || !stdout) {
        resolve();
      } else {
        const pidMatch = stdout.match(/(\d+)\/.*/);
        if (pidMatch && pidMatch[1]) {
          const pid = pidMatch[1];
          exec(`kill -9 ${pid}`, (killErr, killStdout, killStderr) => {
            if (killErr) {
              reject(`Failed to kill process on port ${port}: ${killStderr}`);
            } else {
              resolve(`Killed process ${pid} on port ${port}`);
            }
          });
        } else {
          reject(`Unable to parse PID from netstat output: ${stdout}`);
        }
      }
    });
  });
};

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    console.log(`Checking if port ${PORT} is in use...`);
    await killPortProcess(PORT);
    console.log(`Port ${PORT} is now free.`);

    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
