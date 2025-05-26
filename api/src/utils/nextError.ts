import { NextFunction } from "express";
import { msg } from "../constants/messages";

export const nextError = (next: NextFunction, error: unknown): void =>
  next(error instanceof Error ? error : new Error(msg.UNEXPECTED_ERROR));
