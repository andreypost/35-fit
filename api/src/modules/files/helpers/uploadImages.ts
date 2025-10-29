import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { CustomErrorHandler } from "../../../middleware/errorHandler";

const allowedMineTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const storage = multer.memoryStorage();

function imageFileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (allowedMineTypes.includes(file.mimetype)) return cb(null, true);
  const error: any = new CustomErrorHandler(
    "Only JPG, JPEG, PNG, and WebP images are allowed!",
    400,
    "BadRequestError"
  );
  return cb(error, false);
}

export const uploadImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5, // max 5 files per request
  },
  fileFilter: imageFileFilter,
});
