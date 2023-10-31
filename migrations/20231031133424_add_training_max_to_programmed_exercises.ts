import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("programmed_exercise", tableBuilder => {
        tableBuilder.integer("training_max");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("programmed_exercise", tableBuilder => {
        tableBuilder.dropColumn("training_max");
    });
}

