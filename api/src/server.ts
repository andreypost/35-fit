import "reflect-metadata";
import "./db/env";
import { env } from "./db/env";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { user } from "./routes/user";
import { file } from "./routes/file/file";
import { price } from "./routes/price";
import { scooter } from "./routes/scooter";
import { accessory } from "./routes/accessory";
import { order } from "./routes/order";
import { errorHandler } from "./middleware/errorHandler";
import { logRequestDetails } from "./middleware/logRequestDetails";
import { GraphQLSchema } from "graphql";
import { QuerySchema } from "./graphql/querySchema";
import { MutationSchema } from "./graphql/mutationSchema";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { styleText } from "util";
import { globalLimiter } from "./middleware/rateLimiter";

const app: Application = express();

const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT ? parseInt(env.PORT, 10) : 3000;

const allowedOrigins = [env.HEADLESS_URL, "https://fit-35.web.app"].filter(
  Boolean
) as string[];

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

app.use(globalLimiter);

app.use("/user", user);
app.use("/file", file);
app.use("/price", price);
app.use("/scooter", scooter);
app.use("/accessory", accessory);
app.use("/order", order);

const startApolloServer = async () => {
  console.time();
  const apolloServer = new ApolloServer({
    schema: new GraphQLSchema({
      query: QuerySchema,
      mutation: MutationSchema,
    }),
  });

  await apolloServer.start();
  console.timeEnd();
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

const server = app.listen(PORT, HOST, () =>
  console.log(
    styleText(["underline", "blueBright"], "Server is running on port:"),
    styleText(["underline", "cyanBright"], `http://${HOST}:${PORT}`)
  )
);

server.headersTimeout = 5000;
server.requestTimeout = 5000;
server.timeout = 15000;
server.keepAliveTimeout = 7000;
