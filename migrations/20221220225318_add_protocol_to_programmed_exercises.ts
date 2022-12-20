import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("programmed_exercise", table => {
        table.json("protocol");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("programmed_exercise", table => {
        table.dropColumn("protocol");
    });
}

