import "reflect-metadata";
// import dotenv from "dotenv";
import "./config/env";
import { env } from "./config/env";
import express, { Application, Request, Response } from "express";
// import { logRequestDetails } from "./middleware/logRequestDetails";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { GraphQLSchema } from "graphql";
import { QuerySchema } from "./graphql/querySchema";
import { MutationSchema } from "./graphql/mutationSchema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// dotenv.config();

const app: Application = express();

const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT ? parseInt(env.PORT, 10) : 3000;

app.use(express.json({ limit: "10kb" }));

const allowedOrigins = [
  env.HEADLESS_URL,
  "https://fit-35.web.app",
  "https://fit-35.web.app/#/",
].filter((origin) => origin !== undefined) as string[];

app.use(
  cors<cors.CorsRequest>({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(cookieParser());

// app.use(logRequestDetails);

app.use("/auth", authRoutes);

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({
    schema: new GraphQLSchema({
      query: QuerySchema,
      mutation: MutationSchema,
    }),
  });

  await apolloServer.start();
  return app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const authToken = req?.cookies?.authToken;
        return {
          req,
          res,
          authToken,
        };
      },
    })
  );
};
startApolloServer();

app.get("/", (req: Request, res: Response) =>
  res.send("Hello World with TypeScript Express from ./api server!")
);

app.use(errorHandler);

app.listen(PORT, HOST, () =>
  console.log(`Server is running on port http://${HOST}:${PORT}`)
);

// import sequelize from "./config/database";

// const startServer = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");

//     app.listen(PORT, HOST, () => {
//       console.log(`Server is running on http://${HOST}:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Unable to connect to the database:", err);
//   }
// };

// startServer();
