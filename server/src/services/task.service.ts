import { TaskRepository } from "../repositories/task.repository.js";
import { AppError } from "../utils/app-error.js";
import { Task } from "../generated/client/client.js";

export class TaskService {
  static async createNewTask(title: string, userId: string): Promise<Task> {
    if (!title.trim()) {
      throw new AppError("Task title cannot be empty", 400);
    }
    return TaskRepository.create(title, userId);
  }

  static async getTaskById(id: string): Promise<Task> {
    const task = await TaskRepository.findById(id);
    if (!task) {
      throw new AppError("Requested task was not found", 404);
    }
    return task;
  }

  // ৩. ইউজারের আইডি অনুযায়ী সব টাস্ক রিটার্ন করার লজিক
  static async getUserTasks(userId: string): Promise<Task[]> {
    return TaskRepository.findByUserId(userId);
  }

  // ৪. টাস্ক স্ট্যাটাস চেক করে ডাটাবেজে পাঠানোর বিজনেস লজিক
  static async updateTaskStatus(
    id: string,
    status: "TODO" | "IN_PROGRESS" | "DONE",
  ): Promise<Task> {
    // প্রথমে চেক করে নিব টাস্কটি আদেও এক্সিস্ট করে কি না
    await this.getTaskById(id);
    return TaskRepository.updateStatus(id, status);
  }
}
