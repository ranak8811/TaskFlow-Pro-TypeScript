import express from "express";
import { config } from "./config/env.js";
import { requestLogger } from "./middlewares/logger.middleware.js";
import taskRouter from "./routes/task.routes.js"; // রাউটার ইম্পোর্ট করলাম
import { logMessage } from "./utils/logger.js";

const app = express();
app.use(express.json());

// গ্লোবাল রিকোয়েস্ট লগার মিডলওয়্যার যুক্ত করা হলো
app.use(requestLogger);

// রাউটার মাউন্ট করা হলো
app.use("/api/tasks", taskRouter);

app.listen(config.port, () => {
  logMessage(`Server listening on port ${config.port}`);
});
