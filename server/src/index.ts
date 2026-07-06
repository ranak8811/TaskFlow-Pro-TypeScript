import express, { Request, Response } from "express";
import { logMessage } from "./utils/logger.js";

const app = express();
app.use(express.json()); // JSON রিকোয়েস্ট বডি পার্স করার মিডলওয়্যার

// ১. টাস্ক তৈরি করার রিকোয়েস্ট বডির স্ট্রাকচার ডিফাইন করলাম
interface CreateTaskRequestBody {
  title: string;
  description?: string; // অপশনাল
}

// ২. হোম রাউট (GET /)
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to TaskFlow Pro API!" });
});

// ৩. টাস্ক তৈরি করার রাউট (POST /tasks)
// Request এর ৩ নম্বর জেনেরিক প্যারামিটারে CreateTaskRequestBody সেট করা হয়েছে
app.post(
  "/tasks",
  (req: Request<{}, {}, CreateTaskRequestBody>, res: Response) => {
    const { title, description } = req.body; // টাইপস্ক্রিপ্ট এখন title এবং description এর টাইপ চেনে

    logMessage(`API Request received: Creating task "${title}"`);

    res.status(201).json({
      success: true,
      data: {
        id: "tsk-99",
        title,
        description: description || "No description provided",
      },
    });
  },
);

const PORT = 3000;
app.listen(PORT, () => {
  logMessage(`Express server successfully running on port ${PORT}`);
});
