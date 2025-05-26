import { Injectable, NotFoundException } from '@nestjs/common';
import { mkdir, readdir, rename, rm } from 'fs/promises';
import path from 'path';
import { Dirent, existsSync, mkdirSync, renameSync } from 'fs';
import { resolveFilePath } from '../helpers/resolve.file.path';
import { handleError } from '../../../utils/handle.error';

@Injectable()
export class DirService {
  private basePath: string = resolveFilePath('scan');

  public structureDir = async (): Promise<Dirent[]> => {
    try {
      const fileTree: Dirent[] = await readdir(this.basePath, {
        withFileTypes: true,
        // recursive: true, // all files including nested
      });

      for (let entry of fileTree) {
        if (!entry.isFile()) continue;

        const fileSourceName = path.join(this.basePath, entry.name);

        const fileExtension = path.extname(entry.name).slice(1);

        const targetDir = path.join(this.basePath, fileExtension);

        if (!existsSync(targetDir)) {
          await mkdir(targetDir);
          // mkdirSync(targetDir);
        }

        const fileName = path.basename(entry.name);

        const targetPath = path.join(targetDir, fileName);

        await rename(fileSourceName, targetPath);
        // renameSync(fileSourceName, targetPath);
      }

      return fileTree;
    } catch (error: unknown) {
      handleError(error);
    }
  };

  public async destructureDir(): Promise<Dirent[]> {
    try {
      const fileTree: Dirent[] = await readdir(this.basePath, {
        withFileTypes: true,
        // recursive: true, // all files including nested
      });

      for (let entry of fileTree) {
        if (!entry.isDirectory()) continue;

        const folderPath = path.join(this.basePath, entry.name);

        const files = await readdir(folderPath, { withFileTypes: true });

        for (let file of files) {
          if (!file.isFile()) continue;

          const fileSourceName = path.join(folderPath, file.name);

          const targetPath = path.join(this.basePath, file.name);

          await rename(fileSourceName, targetPath);
          // renameSync(sourcePath, targetPath);
        }
        await rm(folderPath, { recursive: true });
      }

      return fileTree;
    } catch (error: unknown) {
      handleError(error);
    }
  }
}
