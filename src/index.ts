import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";

@Resolver()
class FirstResolver {
  @Query(() => String)
  sayHello() {
    return "Hello World!";
  }
}

async function main() {
  const server = express();

  const schema = await buildSchema({
    resolvers: [FirstResolver]
  });

  const graphServer = new ApolloServer({ schema });

  graphServer.applyMiddleware({ app: server});

  server.listen(4000, () => {
    console.log("server is running on http://localhost:4000/graphql");
  })
}

main();