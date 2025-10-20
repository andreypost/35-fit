import { NextFunction, Request, Response, Router } from "express";
import { userImageRepository, userRepository } from "../../db/database";
import { validateAuthToken } from "../../auth/jsonWebToken";
import { IImageResponse } from "./file.types";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { msg } from "../../constants/messages";
import { nextError } from "../../utils/nextError";

export const imageRoutes = Router();

imageRoutes.get(
  "/all",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IImageResponse[]> | void> => {
    try {
      const currentUser = await getCurrentUser(
        req?.cookies?.authToken,
        res,
        next
      );

      const allImages = await userImageRepository.find({
        where: { user: { id: currentUser?.id } },
        order: { displayOrder: "ASC" },
      });

      return res.status(200).json(allImages);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
