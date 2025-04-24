import { Router, Request, Response, NextFunction } from "express";
import { readdir } from "fs/promises";
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

      fileTree.forEach((entry) => {
        if (!entry.isFile()) return;

        const fileSourceName = path.join(basePath, entry.name);

        const fileExtension = path.extname(entry.name).slice(1);

        const targetDir = path.join(basePath, fileExtension);

        if (!existsSync(targetDir)) {
          mkdirSync(targetDir);
        }

        const fileName = path.basename(entry.name);

        const targetPath = path.join(targetDir, fileName);

        renameSync(fileSourceName, targetPath);
      });
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

      res.status(200).json(fileTree);
    } catch (error: any) {
      next(error);
    }
  }
);
