import { useState, useRef } from "react";
import type React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // কুয়েরি হুকসমূহ
import Button from "./components/Button.tsx";
import Input from "./components/Input.tsx";
import TaskCard from "./components/TaskCard.tsx";
import { taskApi } from "./utils/task-api.ts"; // এপিআই ইম্পোর্ট

export default function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient(); // ক্যাশ ইনভ্যালিডেশনের জন্য ক্লায়েন্ট

  // ১. useQuery: টাস্ক লিস্ট ক্যাশ ফেচিং (অটো-টাইপড)
  const {
    data: tasks = [],
    isPending,
    error: queryError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getTasks,
  });

  // ২. useMutation: নতুন টাস্ক ক্রিয়েট অ্যাকশন
  const createTaskMutation = useMutation({
    mutationFn: taskApi.createTask,
    onSuccess: () => {
      // টাস্ক ক্যাশ রি-ফেচ ট্রিগার করলাম
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTaskName("");
      inputRef.current?.focus();
    },
  });

  // ৩. useMutation: টাস্ক স্ট্যাটাস আপডেট অ্যাকশন
  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "TODO" | "IN_PROGRESS" | "DONE";
    }) => taskApi.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTaskName(e.target.value);
    if (error) setError("");
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!taskName.trim()) {
      setError("Task title is required");
      return;
    }
    createTaskMutation.mutate(taskName);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE",
  ): void => {
    updateTaskMutation.mutate({ id, status: newStatus });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-955 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-400">
            TaskFlow Pro
          </h1>
          <p className="text-slate-400">React Query v5 Integration</p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4"
        >
          <Input
            ref={inputRef}
            label="New Task Title"
            placeholder="Type your task here..."
            value={taskName}
            onChange={handleInputChange}
            error={error || (queryError ? "Failed to load tasks" : "")}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={createTaskMutation.isPending}
          >
            {createTaskMutation.isPending ? "Adding..." : "Add Task"}
          </Button>
        </form>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-300">Task List</h2>
          {tasks.length === 0 ? (
            <p className="text-slate-500 text-sm">No tasks added yet.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
