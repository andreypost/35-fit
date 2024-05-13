const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User").default;
const sequelize = require("./database");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Test Route to check server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route to create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
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
