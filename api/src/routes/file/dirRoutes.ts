import { Router, Request, Response, NextFunction } from "express";
import { mkdir, readdir, rename, rm } from "fs/promises";
import { existsSync, mkdirSync, renameSync } from "fs";
import path from "path";
import { resolveFilePath } from "./helpers/resolveFilePath";

export const dirRoutes = Router();

const basePath = resolveFilePath("scan");

dirRoutes.get(
  "/structure",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const fileTree = await readdir(basePath, {
        withFileTypes: true,
        // recursive: true, // all files including nested
      });

      for (let entry of fileTree) {
        if (!entry.isFile()) return;

        const fileSourceName = path.join(basePath, entry.name);

        const fileExtension = path.extname(entry.name).slice(1);

        const targetDir = path.join(basePath, fileExtension);

        if (!existsSync(targetDir)) {
          await mkdir(targetDir);
          // mkdirSync(targetDir);
        }

        const fileName = path.basename(entry.name);

        const targetPath = path.join(targetDir, fileName);

        await rename(fileSourceName, targetPath);
        // renameSync(fileSourceName, targetPath);
      }
      res.status(200).json(fileTree);
    } catch (error: any) {
      next(error);
    }
  }
);

dirRoutes.get(
  "/destructure",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const fileTree = await readdir(basePath, {
        withFileTypes: true,
        // recursive: true, // all files including nested
      });

      for (let entry of fileTree) {
        if (!entry.isDirectory()) continue;

        const folderPath = path.join(basePath, entry.name);

        const files = await readdir(folderPath, { withFileTypes: true });

        for (let file of files) {
          if (!file.isFile()) continue;

          const fileSourceName = path.join(folderPath, file.name);

          const targetPath = path.join(basePath, file.name);

          await rename(fileSourceName, targetPath);
          // renameSync(sourcePath, targetPath);
        }

        await rm(folderPath, { recursive: true });
      }

      res.status(200).json(fileTree);
    } catch (error: any) {
      next(error);
    }
  }
);
