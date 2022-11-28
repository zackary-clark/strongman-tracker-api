import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("programmed_exercise", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.uuid("user_id").index().notNullable();
        table.uuid("programmed_workout").references("id").inTable("programmed_workout").notNullable();
        table.uuid("exercise").references("id").inTable("exercise").notNullable();
        table.integer("order");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("programmed_exercise");
}

