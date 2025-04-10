import { join } from "path";
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

const userCollectionPath = "jsonData/user-collection.json";

export const resolveFilePath = (filePath: string) => {
  const basePath = process.cwd();

  if (process.platform === "win32") {
    return join(basePath, "..", filePath); // Windows-specific path
  }

  // if (isDocker) {
  //   return join(basePath, filePath); // Docker-specific path
  // }

  if (process.platform === "linux" || process.platform === "darwin") {
    return join(basePath, "..", filePath); // POSIX-specific path for Linux and Mac
  }

  return join(basePath, filePath);
};

let userCollection: IFileUserDetails[] = [];
let usersCountCache: Record<string, number> = {};
let usersAverageEarningsCache: Record<string, number> = {};

file.get(
  "/read",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IFileUserDetails[]> | void> => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      if (!userCollection?.length) {
        userCollection = await getFileData(
          resolveFilePath(userCollectionPath),
          false,
          next
        );
      }
      return res.status(200).json(userCollection);
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
  ): Promise<Response<IFileUserDetails> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      if (!userCollection?.length) {
        userCollection = await getFileData(
          resolveFilePath(userCollectionPath),
          true,
          next
        );
      }

      const { body } = req;

      // userCollection.push(body); // Not thread-safe if multiple clients hit /write in parallel
      const newData = userCollection?.length
        ? [...userCollection, body]
        : [body];

      await writeFileData(resolveFilePath(userCollectionPath), newData);
      userCollection = [];
      usersCountCache = {};
      usersAverageEarningsCache = {};

      return res.status(200).json({
        message: msg.FILE_WAS_WRITTEN_SUCCESSFULLY,
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

      if (Object.keys(usersCountCache)?.length) {
        return res.status(200).json(usersCountCache);
      }

      if (!userCollection?.length) {
        const data = await getFileData(
          resolveFilePath(userCollectionPath),
          false,
          next
        );
        if (!data) return;
        userCollection = data;
      }

      usersCountCache = userCollection.reduce((acc, { country }) => {
        !acc[country] ? (acc[country] = 1) : ++acc[country];
        return acc;
      }, {} as Record<string, number>);

      return res.status(200).json(usersCountCache);
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

      if (Object.keys(usersAverageEarningsCache)?.length) {
        return res.status(200).json(usersAverageEarningsCache);
      }

      if (!userCollection?.length) {
        const data = await getFileData(
          resolveFilePath(userCollectionPath),
          false,
          next
        );
        if (!data) return;
        userCollection = data;
      }

      usersAverageEarningsCache = await countCountryEarnings(userCollection);

      return res.status(200).json(usersAverageEarningsCache);
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

      if (!userCollection?.length) {
        const data = await getFileData(
          resolveFilePath(userCollectionPath),
          false,
          next
        );
        if (!data) return;
        userCollection = data;
      }

      const user = userCollection.find((user) => user.id.toString() === id);
      if (!user) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return next(error);
    }
  }
);
