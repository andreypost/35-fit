import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export class CustomErrorHandler extends Error {
  status: number;
  type: string;

  constructor(message: string, status: number, type: string) {
    super(message);
    this.status = status;
    this.type = type;

    this.name = "CustomErrorHandler";
  }
}

export const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.error("Error Handler: ", err);
  return next(
    res.status(err.status || 500).json({
      message: err.message || "An unknown error occurred",
      success: err.success || false,
      type: err.type || "An unknown type",
    })
  );
};

export const errorValidationCheck = async (
  req: Request,
  next: NextFunction
): Promise<void> => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next({
      message: err.array(),
      status: 400,
      type: "ValidationDataError",
    });
  }
};
