module.exports = {

    development: {
        client: "pg",
        connection: {
            database: "postgres",
            user: "postgres",
            password: "tracker"
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    // TODO: What about real production? This works for docker-desktop only...
    production: {
        client: "pg",
        connection: {
            host: "mypostgres",
            database: "postgres",
            user: "postgres",
            password: "postgres"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }

};
