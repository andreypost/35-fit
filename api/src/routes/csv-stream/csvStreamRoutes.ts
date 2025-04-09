import { NextFunction, Request, Response, Router } from "express";
import { createReadStream, createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import * as csv from "fast-csv";
import { handleFilePath } from "../file/fileRoutes";
import { msg } from "../../constants/messages";
import { userRepository } from "../../config/database";

export const csvStream = Router();

const usersDataPath = handleFilePath("csvData/users-data.csv");

const User = {
  id: "bbb55502-670f-49a2-baf4-901da70c2d23",
  createdAt: "2025-04-06T18:14:48.243Z",
  updatedAt: "2025-04-06T18:14:48.243Z",
  deletedAt: null,
  name: "Andrii Postoliuk",
  surname: "Postoliuk",
  gender: "male",
  age: 0,
  country: "",
  city: "Kyiv",
  email: "test_22@email.com",
  password: "$2b$10$OdQslWd0N.0xY5fvnnXvReenRAFClISiPNsHzzXodMv7o0dKjhsCy",
  phone: "0673788612",
  emergencyName: "",
  emergencyPhone: "",
  grantedPrivileges: 8,
  deniedPrivileges: 0,
};

const readCsvFile = async (
  usersDataPath: string,
  next: NextFunction
): Promise<void | boolean> => {};

const writeCsvFile = async (
  path: string,
  data: any,
  next: NextFunction
): Promise<void> => {};

csvStream.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Request | void> => {
    try {
      if (!existsSync(usersDataPath)) {
        const dirr = path.dirname(usersDataPath);
        mkdirSync(dirr, { recursive: true });
      }

      const allUsers = await userRepository
        .createQueryBuilder("user")
        .select(["user.name", "user.surname", "user.email", "user.phone"])
        .getMany();

      // console.log("allUsers: ", allUsers);

      if (!allUsers?.length) return;

      const csvStream = csv.format({ headers: true });
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

      // console.log("csvStream: ", csvStream);
    } catch (error: any) {
      next(error);
    }
  }
);
