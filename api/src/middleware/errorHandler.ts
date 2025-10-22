import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export class CustomErrorHandler extends Error {
  constructor(
    public message: string,
    public status: number,
    public type = "UnknownError"
  ) {
    super(message);
  }
}

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) return next(err);

  const status = Number(err?.status || err?.statusCode) || 500;
  const type = err?.type || (status === 404 ? "NotFoundError" : "UnknownError");

  console.error("Global Error Handler:", {
    message: err?.message,
    status,
    type,
    path: req.path,
    method: req.method,
    stack: process.env.NODE_ENV === "production" ? undefined : err?.stack,
  });

  res.status(status).json({
    message: status < 500 ? err.message : "Internal Server Error",
    success: false,
    type,
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
