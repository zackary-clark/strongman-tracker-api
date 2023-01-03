import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_exercise_unit", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("user_id").notNullable();
        table.uuid("exercise").references("id").inTable("exercise").notNullable();
        table.specificType("weight_unit", "weight_unit");
        table.specificType("length_unit", "length_unit");
        table.unique(["user_id", "exercise"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_exercise_unit");
}

