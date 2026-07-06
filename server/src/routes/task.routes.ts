import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";

const router = Router(); // এক্সপ্রেস রাউটার তৈরি

// POST /api/tasks রাউটে createTask কন্ট্রোলার ম্যাপ করলাম
router.post("/", createTask);

export default router;
