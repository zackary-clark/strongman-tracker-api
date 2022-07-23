import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("max")
        .dropTableIfExists("lift")
        .dropTableIfExists("workout")
        .createTable("max", (table: Knex.CreateTableBuilder) => {
            table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.date("date").notNullable();
            table.float("squat1RM");
            table.float("bench1RM");
            table.float("deadlift1RM");
            table.float("press1RM");
            table.uuid("user_id").notNullable();
        }).createTable("workout", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.date("date").notNullable();
            table.uuid("user_id").notNullable();
        }).createTable("lift", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.uuid("workout").references("id").inTable("workout").notNullable();
            table.string("name");
            table.integer("reps");
            table.integer("sets");
            table.integer("weight");
            table.uuid("user_id").notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("max")
        .dropTableIfExists("lift")
        .dropTableIfExists("workout")
        .createTable("max", (table: Knex.CreateTableBuilder) => {
            table.increments("id");
            table.date("date").notNullable();
            table.float("squat1RM");
            table.float("bench1RM");
            table.float("deadlift1RM");
            table.float("press1RM");
            table.uuid("user_id").notNullable();
        }).createTable("workout", (table) => {
            table.increments("id");
            table.date("date").notNullable();
            table.uuid("user_id").notNullable();
        }).createTable("lift", (table) => {
            table.increments("id");
            table.integer("workout").references("id").inTable("workout");
            table.string("name");
            table.integer("reps");
            table.integer("sets");
            table.integer("weight");
            table.uuid("user_id").notNullable();
        });
}

