"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_js_1 = require("./utils/logger.js");
const app = (0, express_1.default)();
app.use(express_1.default.json()); // JSON রিকোয়েস্ট বডি পার্স করার মিডলওয়্যার
// ২. হোম রাউট (GET /)
app.get("/", (req, res) => {
    res.json({ message: "Welcome to TaskFlow Pro API!" });
});
// ৩. টাস্ক তৈরি করার রাউট (POST /tasks)
// Request এর ৩ নম্বর জেনেরিক প্যারামিটারে CreateTaskRequestBody সেট করা হয়েছে
app.post("/tasks", (req, res) => {
    const { title, description } = req.body; // টাইপস্ক্রিপ্ট এখন title এবং description এর টাইপ চেনে
    (0, logger_js_1.logMessage)(`API Request received: Creating task "${title}"`);
    res.status(201).json({
        success: true,
        data: {
            id: "tsk-99",
            title,
            description: description || "No description provided",
        },
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    (0, logger_js_1.logMessage)(`Express server successfully running on port ${PORT}`);
});
