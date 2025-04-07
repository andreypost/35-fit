import path, { join } from "path";
import { Router, Request, Response, NextFunction } from "express";
import { validateAuthToken } from "../../auth/jsonWebToken";
import {
  getFileData,
  // writeFileData
} from "./helpers/fileStream";
const { writeFileData } = require("./helpers/fileStream");
import { param } from "express-validator";
import { msg } from "../../constants/messages";
import { IFileUserDetails } from "../../types/interface";
import { countCountryEarnings } from "./helpers/userCollection";
import { fileWriteLimiter } from "../../middleware/rateLimiter";
import { validateFileWrite } from "./fileDto";
import { errorValidationCheck } from "../../validators/errorValidationCheck";

export const file = Router();

const filePath: string = (() => {
  const basePath = process.cwd();
  const jsonDataPath = "jsonData/user-collection.json";

  if (process.platform === "win32") {
    return join(basePath, "..", jsonDataPath);
  }

  // if (isDocker) {
  //   return join(basePath, jsonDataPath); // Docker-specific path
  // }

  if (process.platform === "linux" || process.platform === "darwin") {
    return join(basePath, "..", jsonDataPath); // POSIX-specific path for Linux and Mac
  }

  return join(basePath, jsonDataPath);
})();

let fileData: IFileUserDetails[] = [];
let fileCountCache: Record<string, number> = {};
let fileEarningsCache: Record<string, number> = {};

file.get(
  "/read",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IFileUserDetails> | void> => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

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
    } catch (error: any) {
      return next(error);
    }
  }
);

file.post(
  "/write",
  fileWriteLimiter,
  validateFileWrite,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      if (!fileData?.length) {
        fileData = await getFileData(filePath, next);
      }

      const { body } = req;

      fileData.push(body);

      await writeFileData(filePath, fileData);
      fileData = [];
      fileCountCache = {};
      return res.status(200).json({
        message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY,
        success: true,
        ...body,
      });
    } catch (error: any) {
      return next(error);
    }
  }
);

file.get(
  "/count-by-country",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Record<string, number>> | void> => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      if (Object.keys(fileCountCache)?.length) {
        return res.status(200).json(fileCountCache);
      }

      if (!fileData?.length) {
        fileData = await getFileData(filePath, next);
      }

      fileCountCache = fileData.reduce((acc, { country }) => {
        !acc[country] ? (acc[country] = 1) : ++acc[country];
        return acc;
      }, {} as Record<string, number>);

      return res.status(200).json(fileCountCache);
    } catch (error: any) {
      return next(error);
    }
  }
);

file.get(
  "/average-earnings-by-country",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Record<string, any> | void> => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      if (Object.keys(fileEarningsCache)?.length) {
        return res.status(200).json(fileEarningsCache);
      }

      if (!fileData?.length) {
        fileData = await getFileData(filePath, next);
      }

      fileEarningsCache = await countCountryEarnings(fileData);

      return res.status(200).json(fileEarningsCache);
    } catch (error: any) {
      return next(error);
    }
  }
);

file.get(
  "/users/:id",
  param("id").isInt({ min: 1 }).withMessage(msg.ID_IS_REQUIRED),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Record<string, any> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      const { id } = req.params;

      if (!fileData?.length) {
        fileData = await getFileData(filePath, next);
      }

      const user = fileData.find((user) => user.id.toString() === id);
      if (!user) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return next(error);
    }
  }
);
