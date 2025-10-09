import { NextFunction } from "express";
import { Dirent } from "fs";
import { readdir } from "fs/promises";
import { nextError } from "../../../utils/nextError";

export const scanDirectory = async (
  directory: string,
  next: NextFunction
): Promise<void> => {
  try {
    const files: Dirent[] = await readdir(directory, {
      withFileTypes: true,
      recursive: true,
    });
    if (!files) {
      return next();
    }

    console.log("directory: ", files);
  } catch (error: unknown) {
    nextError(next, error);
  }
};
