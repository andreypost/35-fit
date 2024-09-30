import "reflect-metadata";
import "./config/env";
import { env } from "./config/env";
import express, { Application, Request, Response } from "express";
import { logRequestDetails } from "./middleware/logRequestDetails";
import cors from "cors";
import auth from "./routes/auth";
import file from "./routes/file";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { GraphQLSchema } from "graphql";
import { QuerySchema } from "./graphql/querySchema";
import { MutationSchema } from "./graphql/mutationSchema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const app: Application = express();

const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT ? parseInt(env.PORT, 10) : 3000;

const allowedOrigins = [
  env.HEADLESS_URL,
  "https://fit-35.web.app",
  "https://fit-35.web.app/#/",
].filter((origin) => origin !== undefined) as string[];

app.use(
  express.json({ limit: "10kb" }),
  cors<cors.CorsRequest>({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],
  }),
  cookieParser()
  // logRequestDetails
);

app.use("/auth", auth);

app.use("/file", file);

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
      context: async ({ req, res }) => ({
        req,
        res,
        authToken: req?.cookies?.authToken,
      }),
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
