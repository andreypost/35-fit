import {
  existsSync,
  createReadStream,
  createWriteStream,
  mkdirSync,
  writeFileSync,
} from "fs";
import path from "path";
import { msg } from "../../../constants/messages";
import { mkdir, writeFile } from "fs/promises";
import { nextError } from "../../../utils/nextError";

export const getFileData = async (
  filePath: string,
  addToFile: boolean,
  next: any
): Promise<any> => {
  try {
    if (!existsSync(filePath)) {
      if (addToFile) {
        const dir = path.dirname(filePath);
        await mkdir(dir, { recursive: true });
        // mkdirSync(dir, { recursive: true });
        await writeFile(filePath, "[]");
        // writeFileSync(filePath, "[]");
        console.log(`Created new file at ${filePath}`);
      } else {
        next({
          message: msg.FILE_DOES_NOT_EXIST,
          status: 404,
          type: "AccessFileDirError",
        });
      }
      return;
    }
    return new Promise((res, rej) => {
      let jsonData = "";
      createReadStream(filePath, "utf-8")
        .on("error", (err) => rej(`Error parsing JSON: ${err}`))
        .on("data", (chunk) => (jsonData += chunk))
        .on("end", () => {
          try {
            res(JSON.parse(jsonData));
          } catch (err: any) {
            console.warn("File corrupted, returning empty array");
            res([]);
          }
        });
    });
  } catch (error: unknown) {
    nextError(next, error);
  }
};

const writeFileData = async (filePath: string, data: any): Promise<void> => {
  return new Promise((res, rej) => {
    try {
      const writeStream = createWriteStream(filePath, {
        encoding: "utf-8",
        flags: "w", // Ensures file creation if it doesn't exist
        // flags: "r+", // this flag does not create a new file if does not exists
      });
      writeStream.on("error", (err) => rej(`Error writing file: ${err}`));
      writeStream.on("finish", () => res());

      // writeStream.write(JSON.stringify(data, null, 2));
      // The end function on streams can also take in some optional data to send as the last bit of data on the stream
      writeStream.end(JSON.stringify(data, null, 2));
    } catch (error: any) {
      rej(`Failed to prepare directory or write stream: ${error}`);
    }
  });
};

exports.writeFileData = writeFileData;
