const { Sequelize } = require("sequelize");
require("dotenv").config();

// connect to railway postgres database with url string
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// railway postgres database
// const sequelize = new Sequelize(
//   process.env.PGDATABASE,
//   process.env.PGUSER,
//   process.env.PGPASSWORD,
//   {
//     host: process.env.PGHOST,
//     port: process.env.PGPORT,
//     dialect: "postgres",
//     dialectOptions: process.env.DB_SSL
//       ? {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         }
//       : {},
//     logging: false,
//   }
// );

// local fidb database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
console.log(process.env.PGDATABASE, process.env.PGUSER);
console.log(`./api is running on local port: http://localhost:3000/`);
