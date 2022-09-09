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
const origin = process.env.CLIENT_ORIGIN || "http://localhost:8081";

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
        cache: "bounded",
        formatError: error => {
            logError(error, "Apollo Server Caught Error");
            if (process.env.NODE_ENV !== "development") {
                return new GraphQLError("Error");
            }
            return error;
        },
    });

    await server.start();

    app.use(cors({ origin, credentials: true }));
    app.use(keycloak.middleware());
    app.use(server.graphqlPath, async (req, res, next) => {
        console.log("<======= Token =======>");
        console.log(req.headers.authorization);
        // @ts-ignore
        const userInfo = await keycloak.grantManager.userInfo(req.headers.authorization.substring(7));
        console.log("<======= UserInfo =======>");
        console.log(userInfo);
        console.log("<======= Keycloak Token =======>");
        const grant = await keycloak.getGrant(req, res);
        console.log(grant.access_token);
        next();
    });
    app.use(server.graphqlPath, keycloak.protect()); // applying the keycloak.protect() middleware is what requires users to be logged in
    server.applyMiddleware({ app, cors: false });

    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();
