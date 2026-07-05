"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMessage = logMessage;
function logMessage(message, isError = false) {
    const prefix = isError ? "[ERROR]" : "[INFO]";
    const timestamp = new Date().toISOString();
    console.log(`${prefix} [${timestamp}] - ${message}`);
}
