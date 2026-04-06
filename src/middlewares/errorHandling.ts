import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error", issues: error.issues });
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({ message: "Internal Server Error" });
};
