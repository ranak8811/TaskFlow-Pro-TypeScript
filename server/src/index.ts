import { logMessage } from "./utils/logger.js";

const serverPort: number = 3000;
const appName = "TaskFlow Pro";

logMessage(`Starting server for ${appName}...`);
logMessage(`Server successfully running on port: ${serverPort}`);
