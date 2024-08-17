import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

interface CastError extends AppError {
  name: string;
  value: string;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Something went wrong";

  if (err.name === "ValidationError") {
    statusCode = 400;
    status = "fail";
  } else if (err.name === "CastError") {
    const castError = err as CastError;
    statusCode = 400;
    status = "fail";
    message = `Invalid ID ${castError.value}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    status = "fail";
    message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorHandler;
