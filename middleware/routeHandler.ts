import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const routeHandler = (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
};

export default routeHandler;
