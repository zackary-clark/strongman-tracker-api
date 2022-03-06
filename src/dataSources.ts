import dbClient from "./dbClient";
import { MaxRepo } from "./max/maxRepo";

export type Context = {
    dataSources: Sources
};

export type Sources = {
    maxRepo: MaxRepo
};

const maxRepo = new MaxRepo(dbClient);

export const dataSources = (): Sources => ({maxRepo});
