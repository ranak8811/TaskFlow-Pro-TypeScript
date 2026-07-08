import { api } from "./api.ts";

// ১. এপিআই রেসপন্স ইন্টারফেস
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ২. টাস্ক ডাটা ইন্টারফেস
export interface Task {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

// ৩. টাইপড রেসপন্স সহ এপিআই ফাংশন সমূহ
export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    // Axios get জেনারেক ইন্টারফেস ব্যবহার করলাম
    const response = await api.get<ApiResponse<Task[]>>("/tasks");
    return response.data.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>("/tasks", { title });
    return response.data.data;
  },

  updateTaskStatus: async (
    id: string,
    status: "TODO" | "IN_PROGRESS" | "DONE",
  ): Promise<Task> => {
    const response = await api.patch<ApiResponse<Task>>(`/tasks/${id}`, {
      status,
    });
    return response.data.data;
  },
};
