import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { GraphQLError } from "graphql/error";
import { getContextFunction } from "./config/apollo/context";
import { dataSources } from "./config/apollo/dataSources";
import { resolvers } from "./config/apollo/resolvers";
import { typeDefs } from "./config/apollo/typeDefs";
import { generateKeycloak } from "./config/keycloak";
import { logError } from "./utils/logs";

const port = process.env.PORT || 8080;
const origin = process.env.CLIENT_ORIGIN;
const corsUrls = ["https://studio.apollographql.com"];
if (origin) corsUrls.push(origin);
else corsUrls.push("http://localhost:8081");

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
        csrfPrevention: true,
        formatError: error => {
            logError(error, "Apollo Server Caught Error");
            if (process.env.NODE_ENV !== "development") {
                return new GraphQLError("Error");
            }
            return error;
        },
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
