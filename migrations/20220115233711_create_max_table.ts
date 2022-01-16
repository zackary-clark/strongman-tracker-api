import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("max", (table: Knex.CreateTableBuilder) => {
        table.increments("id");
        table.date("date").notNullable();
        table.float("squat1RM");
        table.float("bench1RM");
        table.float("deadlift1RM");
        table.float("press1RM");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("max");
}

