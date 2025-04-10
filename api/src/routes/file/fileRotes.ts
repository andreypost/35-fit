import { Router } from "express";
import { jsonRoute } from "./jsonRoutes";
import { csvRoute } from "./csvRoutes";

export const file = Router();

file.use("/json", jsonRoute);
file.use("/csv", csvRoute);
