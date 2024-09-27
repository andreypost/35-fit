import { NextFunction, Request, Response } from "express";

export const logRequestDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("logRequestDetails method: ", req.method);
  console.log("logRequestDetails url: ", req.url);
  console.log("logRequestDetails headers: ", res.statusCode);
  next();
};
