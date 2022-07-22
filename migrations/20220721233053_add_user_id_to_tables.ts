import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("max", (table) => {
        table.uuid("user_id").defaultTo("abf3d409-72c6-4c2a-9394-72cce36fe498").notNullable();
        table.string("user_id").alter({alterNullable: false});
    }).alterTable("workout", (table) => {
        table.uuid("user_id").defaultTo("abf3d409-72c6-4c2a-9394-72cce36fe498").notNullable();
        table.string("user_id").alter({alterNullable: false});
    }).alterTable("lift", (table) => {
        table.uuid("user_id").defaultTo("abf3d409-72c6-4c2a-9394-72cce36fe498").notNullable();
        table.string("user_id").alter({alterNullable: false});
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("max", (table) => {
        table.dropColumn("user_id");
    }).alterTable("workout", (table) => {
        table.dropColumn("user_id");
    }).alterTable("lift", (table) => {
        table.dropColumn("user_id");
    });
}

