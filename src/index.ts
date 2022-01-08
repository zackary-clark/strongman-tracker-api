import { knex } from "knex";
import api from "./api";

const port = process.env.PORT || 8080;
const databaseHost = process.env.DB_HOST || "127.0.0.1";
const databasePort = process.env.DB_PORT || "5432";
const databasePassword = process.env.DB_PASSWORD || "tracker";

export const pgClient = knex({
    client: "pg",
    connection: {
        host : databaseHost,
        port : parseInt(databasePort),
        user : "postgres",
        password : databasePassword,
        database : "postgres"
    }
});

api.listen(port, () => {
    console.log(`Strongman Tracker API listening on port ${port}!`);
});
