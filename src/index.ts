import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { expressjwt } from "express-jwt";
import { GraphQLError } from "graphql/error";
import { expressJwtSecret } from "jwks-rsa";
import { context } from "./config/apollo/context";
import { dataSources } from "./config/apollo/dataSources";
import { resolvers } from "./config/apollo/resolvers";
import { typeDefs } from "./config/apollo/typeDefs";
import { logError } from "./utils/logs";

const port = process.env.PORT || 8080;
const origin = process.env.CLIENT_ORIGIN || ["http://localhost:8081", "https://studio.apollographql.com"];
const jwksUri = process.env.JWKS_URI;
const audience = process.env.AUDIENCE;
const issuer = process.env.ISSUER;

async function startApolloServer() {
    if (!(jwksUri && audience && issuer)) {
        console.error("Env Variables not all set.");
        return;
    }
    const app = express();
    const httpServer = http.createServer(app);
    const jwtCheck = expressjwt({
        // @ts-ignore
        secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri
        }),
        audience,
        issuer,
        algorithms: ["RS256"]
    });
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources,
        context,
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
    app.use(server.graphqlPath, jwtCheck);
    server.applyMiddleware({ app, cors: false });

    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();
