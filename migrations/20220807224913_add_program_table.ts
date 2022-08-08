import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("program", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id").index().notNullable();
        table.string("name").notNullable();
        table.text("description");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("program");
}

