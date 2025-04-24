import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';
import path from 'path';
import { existsSync, mkdirSync, renameSync } from 'fs';
import { resolveFilePath } from '../helpers/resolve.file.path';
import { nextError } from '../../../utils/next.error';

@Injectable()
export class DirService {
  private basePath: string = resolveFilePath('scan');

  public structureDir = async (): Promise<any> => {
    try {
      const fileTree = await readdir(this.basePath, {
        withFileTypes: true,
        // recursive: true, // all files including nested
      });

      fileTree.forEach((entry) => {
        if (!entry.isFile()) return;

        const fileSourceName = path.join(this.basePath, entry.name);

        const fileExtension = path.extname(entry.name).slice(1);

        const targetDir = path.join(this.basePath, fileExtension);

        if (!existsSync(targetDir)) {
          mkdirSync(targetDir);
        }

        const fileName = path.basename(entry.name);

        const targetPath = path.join(targetDir, fileName);

        renameSync(fileSourceName, targetPath);
      });
      return fileTree;
    } catch (error: any) {
      nextError(error);
    }
  };
}
