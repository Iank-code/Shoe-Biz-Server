import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server";
// import { PrismaClient } from "@prisma/client";
import morganMiddleware from "../middleware/loggers/morgan_middleware";
import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, World!",
  },
};

// const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const runServer = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(morganMiddleware);
  // server.applyMiddleware({app});
  const newApolloServer = new ApolloServer({ resolvers, typeDefs })

    return { newApolloServer };
};

export { runServer };
