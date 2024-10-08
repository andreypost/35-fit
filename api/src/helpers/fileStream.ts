import fs from "fs";
import { msg } from "../constants/messages";

export const getFileData = (path: string, next: any): Promise<any> => {
  try {
    if (!fs.existsSync(path)) {
      next({
        message: msg.FILE_DOES_NOT_EXIST,
        status: 404,
        type: "AccessFileDirError",
      });
    }
  } catch (error: any) {
    next(error);
  }

  return new Promise((res, rej) => {
    let jsonData = "";
    fs.createReadStream(path, "utf-8")
      .on("data", (chunk) => (jsonData += chunk))
      .on("end", () => {
        try {
          const parsedData = JSON.parse(jsonData);
          res(parsedData);
        } catch (err: any) {
          rej(`Error parsing JSON: ${err}`);
        }
      })
      .on("error", (err) => rej(`Error parsing JSON: ${err}`));
  });
};

export const writeFileData = (path: string, data: any): Promise<void> => {
  return new Promise((res, rej) => {
    const jsonString = JSON.stringify(data, null, 2);

    const writeStream = fs.createWriteStream(path, {
      encoding: "utf-8",
      // flags: "r+", // this flag does not create a new file if does not exists
    });

    writeStream.write(jsonString);

    writeStream
      .end()
      .on("finish", () => res())
      .on("error", (err) => rej(`Error writing file: ${err}`));
  });
};
