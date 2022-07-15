import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import Keycloak from "keycloak-connect";
import { getContextFunction } from "./context";
import { dataSources } from "./dataSources";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const port = process.env.PORT || 8080;
const origin = process.env.CLIENT_ORIGIN;
const corsUrls = ["https://studio.apollographql.com"];
if (origin) corsUrls.push(origin);

Keycloak.prototype.redirectToLogin = function() {
    // By default, Keycloak attempts to redirect unauthenticated requests to the login page.
    // We want everything login(or out) related to go through the client, for now.
    // This causes unauthenticated requests to get a 403: Forbidden, instead of redirecting.
    return false;
};

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const keycloak = new Keycloak({});
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
