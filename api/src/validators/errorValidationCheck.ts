import { Request, NextFunction } from "express";
import { validationResult } from "express-validator";

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
