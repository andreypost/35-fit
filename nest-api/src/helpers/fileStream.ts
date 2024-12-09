import { existsSync, createReadStream, createWriteStream } from 'fs';
import { msg } from '../constants/messages';
import { InternalServerErrorException } from '@nestjs/common';
import { nextError } from './next.error';

export const getFileData = (path: string): Promise<any> => {
  try {
    if (!existsSync(path)) {
      throw new InternalServerErrorException(path, msg.FILE_DOES_NOT_EXIST);
    }
  } catch (error: any) {
    nextError(error);
  }

  return new Promise((res, rej) => {
    let jsonData = '';
    createReadStream(path, 'utf-8')
      .on('data', (chunk) => (jsonData += chunk))
      .on('end', () => {
        try {
          const parsedData = JSON.parse(jsonData);
          res(parsedData);
        } catch (err: any) {
          rej(`Error parsing JSON: ${err}`);
        }
      })
      .on('error', (err) => rej(`Error parsing JSON: ${err}`));
  });
};

export const writeFileData = (path: string, data: any): Promise<void> => {
  return new Promise((res, rej) => {
    const jsonString = JSON.stringify(data, null, 2);

    const writeStream = createWriteStream(path, {
      encoding: 'utf-8',
      // flags: "r+", // this flag does not create a new file if does not exists
    });

    writeStream.write(jsonString);

    writeStream
      .end()
      .on('finish', () => res())
      .on('error', (err) => rej(`Error writing file: ${err}`));
  });
};
