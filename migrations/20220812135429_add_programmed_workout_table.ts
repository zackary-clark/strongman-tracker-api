import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw("CREATE TYPE day_of_week AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');")
        .createTable("programmed_workout", table => {
            table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.uuid("user_id").index().notNullable();
            table.uuid("program").references("id").inTable("program").notNullable();
            table.string("name").notNullable();
            table.integer("order");
            table.text("description");
            table.specificType("focus_groups", "muscle_group[]");
            table.specificType("day", "day_of_week");
            table.index(["user_id", "program"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("programmed_workout")
        .raw("DROP TYPE day_of_week");
}

