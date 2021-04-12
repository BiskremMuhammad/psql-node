import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { UserResolver } from "./schema/resolvers/user";

async function main() {
  await createConnection();

  const server = express();

  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const graphServer = new ApolloServer({ schema });

  graphServer.applyMiddleware({ app: server});

  server.listen(4000, () => {
    console.log("server is running on http://localhost:4000/graphql");
  })
}

main();