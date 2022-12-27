import { Knex } from "knex";
import { Sort } from "../../generated/schema";

const databaseHost = process.env.DB_HOST || "127.0.0.1";
const databasePort = process.env.DB_PORT || "5432";
const databasePassword = process.env.DB_PASSWORD || "tracker";
const databaseUser = process.env.DB_USER || "postgres";

export default {
    client: "pg",
    connection: {
        host: databaseHost,
        port: parseInt(databasePort),
        user: databaseUser,
        password: databasePassword,
        database: "postgres"
    },
    pool: {
        max: 8,
        min: 0,
    }
} as Knex.Config;

export enum KnexOrderByNullsOption {
    first = "first",
    last = "last",
}

export interface KnexOrderByOption {
    column: string,
    order?: Sort,
    nulls?: KnexOrderByNullsOption,
}
