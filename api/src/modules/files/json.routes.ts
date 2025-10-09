import { Router, Request, Response, NextFunction } from "express";
import {
  getFileData,
  // writeFileData
} from "./helpers/fileStream";
const { writeFileData } = require("./helpers/fileStream");
import { param } from "express-validator";
import { msg } from "../../constants/messages";
import { IFileUserDetails } from "./file.types";
import { countCountryEarnings } from "./helpers/userCollection";
import { fileWriteLimiter } from "../../middleware/rateLimiter";
import { validateFileWrite } from "./file.dto";
import { errorValidationCheck } from "../../validators/errorValidationCheck";
import { resolveFilePath } from "./helpers/resolveFilePath";
import { nextError } from "../../utils/nextError";

export const jsonRoute = Router();

const userCollectionPath = "jsonData/user-collection.json";

let userCollection: IFileUserDetails[] = [];
let usersCountCache: Record<string, number> = {};
let usersAverageEarningsCache: Record<string, number> = {};

jsonRoute.get(
  "/read",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IFileUserDetails[]> | void> => {
    try {
      if (!userCollection?.length) {
        let current: IFileUserDetails[] = [];
        for (let i = 0; i < 1_000; i++) {
          current = await getFileData(
            resolveFilePath(userCollectionPath),
            false,
            next
          );
        }
        userCollection = current;
      }
      return res.status(200).json(userCollection);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

jsonRoute.post(
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

jsonRoute.get(
  "/count-by-country",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Record<string, number>> | void> => {
    try {
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

jsonRoute.get(
  "/average-earnings-by-country",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Record<string, any> | void> => {
    try {
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

jsonRoute.get(
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
