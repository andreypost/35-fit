import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { logRequestDetails } from "./middlewares/logRequestDetails";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Custom middleware to log request details
app.use(logRequestDetails);

const allowedOrigins = [
  process.env.HEADLESS_URL,
  "https://fit-35.web.app",
  "https://fit-35.web.app/#/",
].filter((origin) => origin !== undefined) as string[];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript Express from ./api server!");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
});

// import sequelize from "./config/database";

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     app.listen(PORT, HOST, () => {
//       console.log(`Server is running on http://${HOST}:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Unable to connect to the database:", err);
//   }
// };

// startServer();
