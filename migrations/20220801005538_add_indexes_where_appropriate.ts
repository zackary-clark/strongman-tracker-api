import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable("lift", (table) => {
            table.index(["workout", "user_id"]);
        })
        .alterTable("max", (table) => {
            table.index(["user_id"]);
        })
        .alterTable("workout", (table) => {
            table.index(["user_id"]);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable("lift", (table) => {
            table.dropIndex(["workout", "user_id"]);
        })
        .alterTable("max", (table) => {
            table.dropIndex(["user_id"]);
        })
        .alterTable("workout", (table) => {
            table.dropIndex(["user_id"]);
        });
}

