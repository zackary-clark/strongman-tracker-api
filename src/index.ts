import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { Resolvers } from "../generated/schema";
import { dataSources, Sources } from "./dataSources";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const port = process.env.PORT || 8080;

async function startApolloServer(typeDefs: string[], resolvers: Resolvers, dataSources: () => Sources) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources
        // TODO: Include csrfPrevention: true ?
    });
    await server.start();
    if (process.env.CLIENT_ORIGIN) app.use(cors({origin: [process.env.CLIENT_ORIGIN, "https://studio.apollographql.com"]}));
    server.applyMiddleware({ app });
    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers, dataSources);
