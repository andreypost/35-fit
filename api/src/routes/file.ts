import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import { validateAuthToken } from "../auth/jsonWebToken";
import fs from "fs";
import { getFileData, writeFileData } from "../helpers/fileStream";
import { body, validationResult } from "express-validator";
import { msg } from "../constants/messages";

const file = Router();

const fileFolder = "../jsonData";
// const filePath = path.resolve(process.cwd(), fileFolder, "user-collection.json");
const filePath = path.resolve(
  __dirname,
  `../../${fileFolder}/user-collection.json`
); // __dirname is usually better because it is directly tied to the file structure

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

    fs.access(
      fileFolder,
      (err) =>
        err &&
        next({
          message: err.message,
          status: 400,
          type: "AccessFileDirError",
        })
    );

    const fileData = await getFileData(filePath);
    return res.status(200).json(fileData);
  } catch (err: any) {
    next(err);
  }
});

file.post(
  "/write",
  body("data").notEmpty().withMessage(msg.DATE_IS_REQUIRED),
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      next({
        message: err.array(),
        status: 400,
        type: "ValidationDataError",
      });
    }
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken);

      const fileData = await getFileData(filePath);
      const { data } = req.body;

      fileData.push(data);

      await writeFileData(filePath, fileData);
      return res
        .status(200)
        .json({ success: true, message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY });
    } catch (err: any) {
      next(err);
    }
  }
);

export default file;
