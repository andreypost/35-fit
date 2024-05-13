const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "fitdb",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
