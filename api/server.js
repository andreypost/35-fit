const express = require("express");
const User = require("./models/User");
const sequelize = require("./database");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
// app.use();
const corsOptions = {
  origin: [
    process.env.HEADLESS_URL,
    "https://fit-35.web.app",
    "https://fit-35.web.app/#/",
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Test Route to check server
app.get("/", (req, res) => {
  res.send("Hello World from server!");
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password from the result
    });
    res.json(users);
  } catch (error) {
    res.status(500).send(error.toString());
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
    res.status(400).json({ error: error.message });
  }
});

// Connect to the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
