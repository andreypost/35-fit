import { existsSync, createReadStream, createWriteStream, mkdirSync } from "fs";
import path from "path";
import { msg } from "../../../constants/messages";

export const getFileData = async (
  filePath: string,
  writeFile: boolean,
  next: any
): Promise<any> => {
  try {
    if (!existsSync(filePath)) {
      if (writeFile) {
        const dir = path.dirname(filePath);
        mkdirSync(dir, { recursive: true });
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
            rej(`Error parsing JSON: ${err}`);
          }
        });
    });
  } catch (error: any) {
    next(error);
  }
};

const writeFileData = async (filePath: string, data: any): Promise<void> => {
  return new Promise((res, rej) => {
    const writeStream = createWriteStream(filePath, {
      encoding: "utf-8",
      flags: "w", // Ensures file creation if it doesn't exist
      // flags: "r+", // this flag does not create a new file if does not exists
    })
      .on("error", (err) => rej(`Error writing file: ${err}`))
      .on("finish", () => res());

    // writeStream.write(JSON.stringify(data, null, 2));
    // The end function on streams can also take in some optional data to send as the last bit of data on the stream
    writeStream.end(JSON.stringify(data, null, 2));
  });
};

exports.writeFileData = writeFileData;
