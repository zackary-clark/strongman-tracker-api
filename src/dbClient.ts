import { knex } from "knex";

const databaseHost = process.env.DB_HOST || "127.0.0.1";
const databasePort = process.env.DB_PORT || "5432";
const databasePassword = process.env.DB_PASSWORD || "tracker";

export default knex({
    client: "pg",
    connection: {
        host: databaseHost,
        port: parseInt(databasePort),
        user: "postgres",
        password: databasePassword,
        database: "postgres"
    }
});
