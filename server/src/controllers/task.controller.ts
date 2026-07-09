import { RequestHandler } from "express";
import { TaskService } from "../services/task.service.js";
import {
  CreateTaskInput,
  UpdateTaskStatusInput,
} from "../schemas/task.schema.js";

export const createTask: RequestHandler<{}, {}, CreateTaskInput> = async (
  req,
  res,
  next,
) => {
  try {
    const { title } = req.body;
    const currentUser = req.user!;
    const newTask = await TaskService.createNewTask(title, currentUser.id);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskDetails: RequestHandler<{ id: string }> = async (
  req,
  res,
  next,
) => {
  try {
    const { id } = req.params;
    const task = await TaskService.getTaskById(id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// ৩. সব টাস্ক রিসিভ করার নতুন কন্ট্রোলার
export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const currentUser = req.user!;
    const tasks = await TaskService.getUserTasks(currentUser.id);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ৪. টাস্ক স্ট্যাটাস আপডেট করার নতুন কন্ট্রোলার
export const updateTaskStatus: RequestHandler<
  { id: string },
  {},
  UpdateTaskStatusInput
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // বডি এখন টাইপ-সেফ
    const updatedTask = await TaskService.updateTaskStatus(id, status);

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
