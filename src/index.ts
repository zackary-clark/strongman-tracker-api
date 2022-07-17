import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { getContextFunction } from "./config/apollo/context";
import { dataSources } from "./config/apollo/dataSources";
import { generateKeycloak } from "./config/keycloak";
import { resolvers } from "./config/apollo/resolvers";
import { typeDefs } from "./config/apollo/typeDefs";

const port = process.env.PORT || 8080;
const origin = process.env.CLIENT_ORIGIN;
const corsUrls = ["https://studio.apollographql.com"];
if (origin) corsUrls.push(origin);

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const keycloak = generateKeycloak();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources,
        context: getContextFunction(keycloak),
        csrfPrevention: true
    });

    await server.start();

    app.use(cors({origin: corsUrls}));
    app.use(keycloak.middleware());
    app.use(server.graphqlPath, keycloak.protect()); // applying the keycloak.protect() middleware is what requires users to be logged in
    server.applyMiddleware({ app });

    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();
