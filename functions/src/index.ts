import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import User from "./models/User";
import sequelize from "./database";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const allowedOrigins = [
  process.env.HEADLESS_URL,
  "https://.com",
].filter((origin) => origin !== undefined) as string[];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Test Route to check server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password from the result
    });
    res.json(users);
  } catch (error) {
    res.status(500).send((error as Error).toString());
  }
});

// Route to create a new user
app.post("/users", async (req, res) => {
  console.log(req.body); // See exactly what is being received
  try {
    const { name, email, password } = req.body;
    // Add validation logic here if necessary
    const user = await User.create({ name, email, password });
    const userResponse = { ...user.get(), password: undefined }; // Exclude password from the response
    res.status(201).json(userResponse);
  } catch (error) {
    console.error(error); // Log the error to the server console
    res.status(400).json({ error: (error as Error).message });
  }
});

// Connect to the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
