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
        csrfPrevention: true
    });

    await server.start();

    app.use(cors({origin: corsUrls}));
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
    server.applyMiddleware({ app });

    await httpServer.listen(port);
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer();
