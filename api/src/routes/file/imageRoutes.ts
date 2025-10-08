import { NextFunction, Request, Response, Router } from "express";
import { nextError } from "../../utils/nextError";

export const imageRoutes = Router();

imageRoutes.get(
  "/all",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response[] | void> => {
    try {
      return [];
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
