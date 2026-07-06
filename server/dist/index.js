"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_js_1 = require("./config/env.js");
const logger_middleware_js_1 = require("./middlewares/logger.middleware.js");
const task_routes_js_1 = __importDefault(require("./routes/task.routes.js")); // রাউটার ইম্পোর্ট করলাম
const logger_js_1 = require("./utils/logger.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// গ্লোবাল রিকোয়েস্ট লগার মিডলওয়্যার যুক্ত করা হলো
app.use(logger_middleware_js_1.requestLogger);
// রাউটার মাউন্ট করা হলো
app.use("/api/tasks", task_routes_js_1.default);
app.listen(env_js_1.config.port, () => {
    (0, logger_js_1.logMessage)(`Server listening on port ${env_js_1.config.port}`);
});
