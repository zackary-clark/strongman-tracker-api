import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import { DocumentNode } from "graphql";
import api from "./api";
import { Resolvers } from "../generated/schema";
import typeDefs from "./schema";

const port = process.env.PORT || 8080;

api.listen(port, () => {
    console.log(`Strongman Tracker API listening on port ${port}!`);
});

async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await httpServer.listen(4000);
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const resolvers = {
    Query: {
        index() {
            return [{id: "asdf", date: new Date()}];
        }
    },
};

startApolloServer(typeDefs, resolvers);
