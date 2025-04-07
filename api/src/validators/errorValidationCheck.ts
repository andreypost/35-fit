import { Request, NextFunction } from "express";
import { validationResult } from "express-validator";

export const errorValidationCheck = (
  req: Request,
  next: NextFunction
): boolean => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.error("Error Validation Check: ", err);
    next({
      message: err.array(),
      status: 400,
      type: "ValidationDataError",
    });
    return false;
  }
  return true;
};
