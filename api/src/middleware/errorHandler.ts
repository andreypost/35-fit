import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err.name === "QueryFailedError") {
    res.status(400).json({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "An unknown error occurred" });
  }
  next();
};
