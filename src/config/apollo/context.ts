import { AuthenticationError } from "apollo-server-core";
import express from "express";
import Keycloak, { Token } from "keycloak-connect";
import { Sources } from "./dataSources";

export type User = {
    /** Keycloak user ID (uuid) */
    id: string,
    username: string,
    emailVerified: boolean,
    name?: string,
    givenName?: string,
    familyName?: string,
    email?: string
};

export type Context = {
    dataSources: Sources,
    /** Contains user info, mostly used for the id to query for ownership */
    user: User,
    /** Used for authorization
     * @example
     * // Determine if this query's user has a particular role
     * token.hasRole(roleName)
     */
    token: Token
};

export const getUser = async (keycloak: Keycloak.Keycloak, req: express.Request): Promise<User> => {
    const header = req.headers.authorization;
    const isBearerToken = header?.indexOf("bearer ") === 0 || header?.indexOf("Bearer ") === 0;
    const token = isBearerToken ? header?.substring(7) : undefined;
    if (!token) throw new AuthenticationError("must be logged in");
    let userInfo;
    try {
        userInfo = await keycloak.grantManager.userInfo(token);
    } catch (e) {
        throw new AuthenticationError("must be logged in");
    }
    return {
        // @ts-ignore bad keycloak typing for userInfo
        id: userInfo.sub,
        // @ts-ignore
        username: userInfo.preferred_username,
        // @ts-ignore
        emailVerified: userInfo.email_verified,
        // @ts-ignore
        name: userInfo.name,
        // @ts-ignore
        givenName: userInfo.given_name,
        // @ts-ignore
        familyName: userInfo.family_name,
        // @ts-ignore
        email: userInfo.email
    };
};

export const getToken = async (keycloak: Keycloak.Keycloak, req: express.Request, res: express.Response): Promise<Token> => {
    let token: Token | undefined;
    try {
        const grant = await keycloak.getGrant(req, res);
        token = grant.access_token;
    } catch (e) {
        throw new AuthenticationError("must be logged in");
    }
    if (!token) throw new AuthenticationError("must be logged in");
    return token;
};

export const getContextFunction = (keycloak: Keycloak.Keycloak) => async ({ req, res }: {req: express.Request, res: express.Response}) => (
    {
        user: await getUser(keycloak, req),
        token: await getToken(keycloak, req, res)
    });
