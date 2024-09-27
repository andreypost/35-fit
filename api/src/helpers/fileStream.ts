import fs from "fs";

export const getFileData = (path: string): Promise<any> => {
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

    const writeStream = fs.createWriteStream(path, { encoding: "utf-8" });

    writeStream.write(jsonString);

    writeStream
      .end()
      .on("finish", () => res())
      .on("error", (err) => rej(`Error writing file: ${err}`));
  });
};
