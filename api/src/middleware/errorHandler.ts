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
): void => {
  console.error("Global Error Handler: ", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || "An unknown error occurred",
    success: err.success ?? false,
    type: err.type || "UnknownError",
  });
};

export const isPgUniqueViolation = (
  error: unknown,
  statusCode: string
): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === statusCode
  );
};
