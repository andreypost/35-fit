import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import { validateAuthToken } from "../auth/jsonWebToken";
import { getFileData, writeFileData } from "../helpers/fileStream";
import { body, validationResult } from "express-validator";
import { msg } from "../constants/messages";

const file = Router();

// const filePath = path.resolve(process.cwd(), "../", "user-collection.json");
const filePath = path.resolve(__dirname, "../../../user-collection.json"); // __dirname is usually better because it is directly tied to the file structure

file.get("/read", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req?.cookies?.authToken;
    await validateAuthToken(authToken);

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
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
