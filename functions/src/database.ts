import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// to connect to railway postgres database with url string
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// const sequelize = new Sequelize( // for local fidb database
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASS!,
//   {
//     host: process.env.DB_HOST!,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: false,
//     },
//     logging: false,
//   }
// );

console.log(
  "functions: ",
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DATABASE_URL
);

export default sequelize;
