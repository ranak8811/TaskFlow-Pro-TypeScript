import { Request, Response, NextFunction } from "express";
import { logMessage } from "../utils/logger.js";

// এক্সপ্রেস মিডলওয়্যার টাইপিং
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  logMessage(`[REQUEST LOGGER] ${req.method} ${req.path}`);
  next(); // পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে পাঠানো হলো
}
