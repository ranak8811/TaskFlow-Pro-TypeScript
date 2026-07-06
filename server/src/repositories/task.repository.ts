import { prisma } from "../config/db.js";
// প্রিজমার জেনারেটেড ফাইল থেকে Task টাইপ ইম্পোর্ট করলাম
import { Task } from "../generated/client/client.js";

export class TaskRepository {
  // ১. একটি নতুন টাস্ক তৈরি করা
  static async create(title: string, userId: string): Promise<Task> {
    return prisma.task.create({
      data: {
        title,
        userId,
      },
    });
  }

  // ২. ইউজারের আইডি অনুযায়ী সব টাস্ক খুঁজে বের করা
  static async findByUserId(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  // ৩. আইডি অনুযায়ী একটি একক টাস্ক খুঁজে বের করা (যা null হতে পারে)
  static async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }
}
