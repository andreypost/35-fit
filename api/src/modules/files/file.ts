import { Router } from "express";
import { jsonRoute } from "./json.routes";
import { csvRoutes } from "./csv.routes";
import { dirRoutes } from "./dir.routes";
import { imageRoutes } from "./image.routes";

export const file = Router();

file.use("/json", jsonRoute);
file.use("/csv", csvRoutes);
file.use("/dir", dirRoutes);
file.use("/image", imageRoutes);
