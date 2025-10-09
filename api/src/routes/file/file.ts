import { Router } from "express";
import { jsonRoute } from "./json";
import { csvRoutes } from "./csv";
import { dirRoutes } from "./dir";
import { imageRoutes } from "./image";

export const file = Router();

file.use("/json", jsonRoute);
file.use("/csv", csvRoutes);
file.use("/dir", dirRoutes);
file.use("/image", imageRoutes);
