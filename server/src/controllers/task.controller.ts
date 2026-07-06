import { RequestHandler } from "express";

interface CreateTaskBody {
  title: string;
}

// RequestHandler ব্যবহার করে পুরো কন্ট্রোলার টাইপিং (সংক্ষিপ্ত ও সেফ)
export const createTask: RequestHandler<{}, {}, CreateTaskBody> = (
  req,
  res,
) => {
  const { title } = req.body; // টাইপস্ক্রিপ্ট জানে title একটি string

  res.status(201).json({
    success: true,
    data: {
      id: "tsk-101",
      title,
    },
  });
};
