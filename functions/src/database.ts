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

// for local fidb database
// const sequelize = new Sequelize(
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

export default sequelize;
