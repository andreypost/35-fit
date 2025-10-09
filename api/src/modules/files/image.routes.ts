import { NextFunction, Request, Response, Router } from "express";
import { userImageRepository, userRepository } from "../../db/database";
import { validateAuthToken } from "../../auth/jsonWebToken";
import { IImageResponse } from "./file.types";
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
      const { email } = await validateAuthToken(req?.cookies?.authToken, res)

      const currentUser = await userRepository.findOne({ where: { email } })
      if (!currentUser) {
        return next({ message: msg.USER_NOT_FOUND })
      }

      const userId = currentUser.id

      const allImages = await userImageRepository.find({
        where: { user: { id: userId } },
        order: { displayOrder: "ASC" }
      })

      return res.status(200).json(allImages)
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
