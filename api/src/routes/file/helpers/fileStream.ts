import { existsSync, createReadStream, createWriteStream } from "fs";
import { msg } from "../../../constants/messages";

export const getFileData = (path: string, next: any): Promise<any> => {
  try {
    if (!existsSync(path)) {
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
    createReadStream(path, "utf-8")
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
};

const writeFileData = (path: string, data: any): Promise<void> => {
  return new Promise((res, rej) => {
    const writeStream = createWriteStream(path, {
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
