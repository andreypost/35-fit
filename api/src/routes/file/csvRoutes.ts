import { NextFunction, Request, Response, Router } from "express";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import * as csv from "fast-csv";
import { resolveFilePath } from "./jsonRoutes";
import { msg } from "../../constants/messages";
import { userRepository } from "../../config/database";

export const csvRoute = Router();

const usersDataPath = resolveFilePath("csvData/users-data.csv");

interface CsvUser {
  name: string;
  surname: string;
  gender: string;
  age: number;
  country: string;
  city: string;
  email: string;
  phone: string;
}

const readCsvFile = async (
  usersDataPath: string,
  next: NextFunction
): Promise<void | boolean> => {};

const writeCsvFile = async (
  path: string,
  data: any,
  next: NextFunction
): Promise<void> => {};

csvRoute.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | void> => {
    try {
      const allUsers = await userRepository
        .createQueryBuilder("user")
        .select([
          "user.name AS name",
          "user.surname AS surname",
          "user.gender AS gender",
          "user.age AS age",
          "user.country AS country",
          "user.city AS city",
          "user.email AS email",
          "user.phone AS phone",
        ])
        .getRawMany();

      console.log("allUsers: ", allUsers);

      if (!allUsers?.length) return;

      if (!existsSync(usersDataPath)) {
        const dirr = path.dirname(usersDataPath);
        mkdirSync(dirr, { recursive: true });
      }

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="users-data.csv"'
      );
      res.setHeader("Content-Type", "text/csv");

      const transform = (row: CsvUser): CsvUser => ({
        name: row.name.toUpperCase(),
        surname: row.surname.toUpperCase(),
        gender: row.gender.toUpperCase(),
        age: row.age,
        country: row.country,
        city: row.city,
        email: row.email,
        phone: row.phone,
      });

      const csvStream = csv.format({ headers: true, transform });

      // <-- 00 without saving csv file to disk
      // allUsers.forEach((user) => csvStream.write(user));
      // csvStream.pipe(res);
      // csvStream.end();
      // <-- 00 end

      // <-- 01 with saving csv file to disk
      const writable = createWriteStream(usersDataPath, {
        encoding: "utf-8",
        flags: "w",
      });

      csvStream.pipe(writable);
      allUsers.forEach((user) => csvStream.write(user));
      csvStream.end();

      writable.on("finish", () => {
        return res.download(usersDataPath, "users-data.csv");
      });

      writable.on("error", (err) => {
        next(err);
      });
      // <-- 01 end

      console.log("csvStream: ", csvStream);
    } catch (error: any) {
      next(error);
    }
  }
);
