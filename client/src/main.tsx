import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // কুয়েরি লাইব্রেরি
import { router } from "./router/index.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";

// ১. গ্লোবাল কুয়েরি ক্লায়েন্ট তৈরি করলাম
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ২. সমগ্র অ্যাপকে QueryClientProvider দিয়ে র‍্যাপ করলাম */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
