const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   // for railway postgres database
//   dialect: "postgres",
//   protocol: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // You might need this if using a self-signed certificate
//     },
//   },
// });

const dbName = process.env.PGDATABASE || "railway";
const dbUser = process.env.PGUSER || "postgres";
const dbPass = process.env.PGPASSWORD || "ntbkVWGBsHSKhRGJeKgOfjinLhhSJxqJ";
const dbHost = process.env.PGHOST || "monorail.proxy.rlwy.net";
const dbPort = process.env.PGPORT ? parseInt(process.env.PGPORT) : 33230;
const dbSsl = process.env.DB_SSL === "true";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  dialectOptions: dbSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: false,
});

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

module.exports = sequelize;
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DATABASE_URL);
