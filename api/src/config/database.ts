import { DataSource } from "typeorm";
import { env } from "./env";
import { styleText } from "util";
import { User } from "../entities/User";
import { Price } from "../entities/Price";
import { Scooter } from "../entities/Scooter";
import { Accessory } from "../entities/Accessory";
import { OrderItem } from "../entities/OrderItem";
import { Order } from "../entities/Order";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Price, Scooter, Accessory, OrderItem, Order],
  migrations: env.NODE_ENV === "production" ? [] : ["dist/migration/**/*.js"],
});

AppDataSource.initialize()
  .then(() =>
    console.log(
      styleText(
        ["doubleunderline", "yellowBright"],
        "Data Source has been initialized!"
      )
    )
  )
  .catch((err) =>
    console.error("Error during Data Source initialization:", err)
  );

export const userRepository = AppDataSource.getRepository(User);
export const orderRepository = AppDataSource.getRepository(Order);

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
