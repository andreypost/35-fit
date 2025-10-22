import { Request, NextFunction, RequestHandler } from "express";
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

export const validateRequest: RequestHandler = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      // details: errors.array(),
      message: errors.array(),
      status: 400,
      type: "ValidationDataError",
    });
  }
  return next();
};
