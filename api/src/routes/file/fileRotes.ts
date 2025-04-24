import { Router } from "express";
import { jsonRoute } from "./jsonRoutes";
import { csvRoutes } from "./csvRoutes";
import { dirRoutes } from "./dirRoutes";

export const file = Router();

file.use("/json", jsonRoute);
file.use("/csv", csvRoutes);
file.use("/dir", dirRoutes);
