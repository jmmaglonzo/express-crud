import { Request, Response, NextFunction } from "express";
import Task from "../model/task.model";
import asyncHandler from "../lib/asyncHandler";
import AppError from "../utils/appError";

export const getAllTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.find();

    if (task.length === 0) {
      return next(new AppError("No task found", 404));
    }

    res.status(200).json({
      status: "success",
      results: task.length,
      data: {
        task,
      },
    });
  }
);

export const getTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const getTask = await Task.findById(req.params.id);

    if (!getTask) {
      return next(
        new AppError(`Resource not found with and ID of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        getTask,
      },
    });
  }
);

export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const createTask = await Task.create(req.body);
    res.status(200).json({
      status: "success",
      data: { createTask },
    });
  }
);

export const updateTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return next(
        new AppError(`Resource not found with and ID of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: { update },
    });
  }
);

export const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return next(
        new AppError(`Resource not found with and ID of ${req.params.id}`, 404)
      );
    }

    res.status(204).json({
      data: null,
    });
  }
);
