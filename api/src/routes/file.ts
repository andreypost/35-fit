import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import { validateAuthToken } from "../auth/jsonWebToken";
import { getFileData, writeFileData } from "../helpers/fileStream";
import { body, validationResult } from "express-validator";
import { msg } from "../constants/messages";
import { IFileUserDetails } from "../types/interface";

const file = Router();

const fileFolder = "../jsonData";
// const filePath = path.resolve(process.cwd(), fileFolder, "user-collection.json");
const filePath = path.resolve(
  __dirname,
  `../../${fileFolder}/user-collection.json`
); // __dirname is usually better because it is directly tied to the file structure

let fileData: IFileUserDetails[] = [];

file.get("/read", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req?.cookies?.authToken;
    await validateAuthToken(authToken);

    // fs.rename(
    //   fileFolder,
    //   "../jsonData1",
    //   (err) =>
    //     err &&
    //     next({
    //       message: err.message,
    //       status: 400,
    //       type: "RenameError",
    //     })
    // );

    // fs.access(
    //   fileFolder,
    //   (err) =>
    //     err &&
    //     next({
    //       message: err.message,
    //       status: 400,
    //       type: "AccessFolderDirError",
    //     })
    // );

    if (!fileData?.length) {
      fileData = await getFileData(filePath, next);
    }
    return res.status(200).json(fileData);
  } catch (err: any) {
    next(err);
  }
});

file.post(
  "/write",
  body("id").isInt({ min: 1 }).withMessage(msg.ID_IS_REQUIRED),
  body("earnings").notEmpty().withMessage(msg.EARNINGS_IS_REQUIRED),
  body("country").notEmpty().withMessage(msg.COUNTRY_IS_REQUIRED),
  body("name").notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken);

      const err = validationResult(req);
      if (!err.isEmpty()) {
        next({
          message: err.array(),
          status: 400,
          type: "ValidationDataError",
        });
      }

      if (!fileData?.length) {
        fileData = await getFileData(filePath, next);
      }

      const { body } = req;

      fileData.push(body);

      await writeFileData(filePath, fileData);
      fileData = [];
      return res
        .status(200)
        .json({ message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY, success: true });
    } catch (error: any) {
      next(error);
    }
  }
);

export default file;
