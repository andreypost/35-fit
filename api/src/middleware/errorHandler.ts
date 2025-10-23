import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { msg } from "../constants/messages";

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

  // console.log("globalErrorHandler err: ", err.code, err)

  if ((err as any)?.code === "23505") {
    err = {
      message: msg.EMAIL_ALREADY_EXIST,
      status: 409,
      type: "DatabaseValidationError",
      stack: err?.detail,
    };
  } else if ((err as any)?.code === "23503") {
    err = {
      message: msg.USER_CANNOT_BE_DELETED,
      status: 409,
      type: "DatabaseValidationError",
      stack: err?.detail,
    };
  }

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
    message: err.message || "Internal Server Error",
    type,
  });
};
