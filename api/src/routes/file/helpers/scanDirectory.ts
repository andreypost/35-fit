import { NextFunction } from "express";
import { readdir } from "fs/promises";

export const scanDirectory = async (
  directory: string,
  next: NextFunction
): Promise<void> => {
  try {
    const files = await readdir(directory, { withFileTypes: true, recursive: true });
    if (!files) {
      return next();
    }

    console.log("directory: ", files);
  } catch (error: any) {
    next(error);
  }
};
