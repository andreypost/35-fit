import { Request, Response, NextFunction } from "express";

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

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Handler: ", err);
  return next(
    res.status(err.status || 500).json({
      message: err.message || "An unknown error occurred",
      success: err.success || false,
      type: err.type || "An unknown type",
    })
  );
};
