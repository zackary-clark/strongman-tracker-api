const databaseHost = process.env.DB_HOST || "127.0.0.1";
const databasePort = process.env.DB_PORT || "5432";
const databasePassword = process.env.DB_PASSWORD || "tracker";
const databaseUser = process.env.DB_USER || "postgres";
const database = process.env.DB || "tracker";

module.exports = {
    client: "pg",
    connection: {
        host: databaseHost,
        port: parseInt(databasePort),
        user: databaseUser,
        password: databasePassword,
        database
    },
    migrations: {
        tableName: "knex_migrations"
    }
};
