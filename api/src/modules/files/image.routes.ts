import { Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { userImageRepository } from "../../db/database";
import { IImageResponse } from "./file.types";
import { getCurrentUser } from "../../utils/getCurrentUser";
import { uploadImages } from "./helpers/uploadImages";
import { msg } from "../../constants/messages";

export const imageRoutes = Router();

imageRoutes.get(
  "/all",
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IImageResponse[]> | void> => {
      const currentUser = await getCurrentUser(req?.cookies?.authToken, res);

      const allImages = await userImageRepository.find({
        where: { user: { id: currentUser?.id } },
        order: { displayOrder: "ASC" },
      });

      return res.status(200).json(allImages);
    }
  )
);

imageRoutes.post(
  "/upload",
  uploadImages.array("images", 5),
  asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    console.log("upload files: ", files);

    return res
      .status(200)
      .json({ message: `${files.length} ${msg.IMAGES_UPLOADED_SUCCESSFULLY}` });
  })
);
