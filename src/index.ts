import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { DocumentNode } from "graphql";
import http from "http";
import { Resolvers } from "../generated/schema";
import { resolvers } from "./resolvers";
import typeDefs from "./schema";

const port = process.env.PORT || 8080;

async function startApolloServer(typeDefs: DocumentNode, resolvers: Resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    if (process.env.CLIENT_ORIGIN) app.use(cors({origin: process.env.CLIENT_ORIGIN}));
    server.applyMiddleware({ app });
    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
