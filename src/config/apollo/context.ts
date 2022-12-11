import { AuthenticationError } from "apollo-server-express";
import express from "express";
import jws from "jws";
import { Sources } from "./dataSources";

export type User = {
    /** Auth0 sub */
    id: string,
};

export type Context = {
    dataSources: Sources,
    /** Contains user info, mostly used for the id to query for ownership */
    user: User,
};

export const context = async ({ req, res }: {req: express.Request, res: express.Response}) => {
    const header = req.headers.authorization;
    const isBearerToken = header?.indexOf("bearer ") === 0 || header?.indexOf("Bearer ") === 0;
    const token = isBearerToken ? header?.substring(7) : undefined;

    const decoded = token ? jws.decode(token) : undefined;
    const sub = decoded?.payload?.sub;

    if (!sub || typeof sub !== "string") {
        throw new AuthenticationError("Access Token Malformed");
    }

    return {
        user: { id: sub }
    };
};
