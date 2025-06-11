import { Router, Request, Response, NextFunction } from "express";
import { mkdir, readdir, rename, rm } from "fs/promises";
import { Dirent, existsSync, mkdirSync, renameSync } from "fs";
import path from "path";
import { resolveFilePath } from "./helpers/resolveFilePath";
import { nextError } from "../../utils/nextError";

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
      const fileTree: Dirent[] = await readdir(basePath, {
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
    } catch (error: unknown) {
      nextError(next, error);
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
      const fileTree: Dirent[] = await readdir(basePath, {
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

dirRoutes.post(
  "/upload-slowly",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<{ message: string }> | void> => {
    try {
      console.log(
        "[Server] Received /upload-slowly request. Waiting for body..."
      );
      let dataReceived = 0;
      req.on("data", (chunk) => {
        dataReceived += chunk.length;
        console.log(`[Server] Received ${dataReceived} bytes of body data.`);
      });
      req.on("end", () => {
        console.log(
          `[Server] Finished receiving body for /upload-slowly. Total bytes: ${dataReceived}`
        );
        res.status(200).send(`Received ${dataReceived} bytes of data.`);
      });
      req.on("close", () => {
        console.log(
          "[Server] /upload-slowly connection closed by client or server timeout during body receipt."
        );
      });
      req.on("error", (err) => {
        console.error("[Server] Request stream error:", err.message);
      });
      res.status(200).json({ message: "Upload successful!" });
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
