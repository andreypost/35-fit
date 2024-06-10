const { Sequelize } = require("sequelize");
require("dotenv").config();

// to connect to railway postgres database with url string
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

// const dbName = process.env.PGDATABASE || "railway";
// const dbUser = process.env.PGUSER || "postgres";
// const dbPass = process.env.PGPASSWORD || "";
// const dbHost = process.env.PGHOST || "monorail.proxy.rlwy.net";
// const dbPort = process.env.PGPORT ? parseInt(process.env.PGPORT) : 33230;
// const dbSsl = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
    dialectOptions: process.env.DB_SSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
    logging: false,
  }
);

// const sequelize = new Sequelize( // for local fidb database
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl:
//         process.env.DB_SSL === "true"
//           ? {
//               require: true,
//               rejectUnauthorized: false,
//             }
//           : false,
//     },
//     logging: false,
//   }
// );

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
