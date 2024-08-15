import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entity/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations:
    process.env.NODE_ENV === "production" ? [] : ["dist/migration/**/*.js"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME as string,
//   process.env.DB_USER as string,
//   process.env.DB_PASS as string,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
// );

// export default sequelize;

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
