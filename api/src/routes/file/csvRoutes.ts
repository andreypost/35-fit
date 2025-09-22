import { NextFunction, Request, Response, Router } from "express";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import { format } from "fast-csv";
import { resolveFilePath } from "./helpers/resolveFilePath";
import { userRepository } from "../../db/database";
import { nextError } from "../../utils/nextError";

export const csvRoutes = Router();

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

csvRoutes.get(
  "/read",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | void> => {
    try {
      const saveToDisk: boolean = true;

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

      if (!allUsers?.length) return;

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

      const csvStream = format({ headers: true, transform });

      if (saveToDisk) {
        if (!existsSync(usersDataPath)) {
          mkdirSync(path.dirname(usersDataPath), { recursive: true });
        }

        const writable = createWriteStream(usersDataPath, {
          encoding: "utf-8",
          flags: "w",
        });

        csvStream.pipe(writable);
        for (let i = 0; i < 1_000_000; i++) {
          // simulating with 1M+ rows
          allUsers.forEach((user) => csvStream.write(user));
        }
        csvStream.end();

        await new Promise<void>((res, rej) => {
          writable.on("finish", res);
          writable.on("error", rej);
        });

        res.setHeader("Content-type", "text/csv");
        return res.download(usersDataPath, "user-data.csv");
      } else {
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="users-data.csv"'
        );
        res.setHeader("Content-Type", "text/csv");

        csvStream.pipe(res).on("finish", () =>
          // Trigger something after the stream completes (like clean-up, closing connections)
          console.log("CSV stream to client")
        );

        for (let i = 0; i < 1_000_000; i++) {
          // simulating with 1M+ rows
          allUsers.forEach((user) => csvStream.write(user));
        }

        csvStream.end();

        return;
      }
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
