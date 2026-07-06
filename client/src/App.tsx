import { useState } from "react";

export default function App() {
  // কাউন্ট স্টেটের টাইপ স্পষ্টভাবে number ঘোষণা করলাম
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400">
          TaskFlow Pro
        </h1>
        <p className="text-slate-400 text-lg">
          React + Vite + TypeScript + Tailwind CSS v4
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <span className="text-xl font-medium text-slate-300">
          Counter Component
        </span>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Count is: {count}
        </button>
      </div>
    </div>
  );
}
