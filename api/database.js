const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You might need this if using a self-signed certificate
    },
  },
});

// sequelize
//   .query(
//     "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
//   )
//   .then(([results, metadata]) => {
//     console.log("Tables in the database:", results);
//   })
//   .catch((err) => {
//     console.error("Error fetching tables:", err);
//   });

// const sequelize = new Sequelize( // for local fidb database
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: false,
//     },
//     logging: false,
//   }
// );

module.exports = sequelize;
console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DATABASE_URL);
