import { Router } from "express";
import { jsonRoute } from "./jsonRoutes";
import { csvRoutes } from "./csvRoutes";
import { dirRoutes } from "./dirRoutes";
import { imageRoutes } from "./imageRoutes";

export const file = Router();

file.use("/json", jsonRoute);
file.use("/csv", csvRoutes);
file.use("/dir", dirRoutes);
file.use("/image", imageRoutes);
