import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("workout", (table) => {
        table.increments("id");
        table.date("date").notNullable();
    }).createTable("lift", (table) => {
        table.increments("id");
        table.integer("workout");
        table.foreign("workout").references("id").inTable("workout");
        table.string("name");
        table.integer("reps");
        table.integer("sets");
        table.integer("weight");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("workout").dropTable("lift");
}

