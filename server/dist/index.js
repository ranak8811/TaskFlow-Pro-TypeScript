"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = require("./utils/logger.js");
const serverPort = 3000;
const appName = "TaskFlow Pro";
(0, logger_js_1.logMessage)(`Starting server for ${appName}...`);
(0, logger_js_1.logMessage)(`Server successfully running on port: ${serverPort}`);
