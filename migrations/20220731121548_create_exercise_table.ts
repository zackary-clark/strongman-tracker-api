import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .raw(
            "CREATE TYPE muscle_group " +
            "AS ENUM " +
            "('abs', 'biceps', 'butt', 'calves', 'chest', 'forearms', 'hamstrings', " +
            "'lowerBack', 'quads', 'shoulders', 'traps', 'triceps', 'upperBack');"
        )
        .createTable("exercise", (table) => {
            table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
            table.string("name").notNullable();
            table.text("description");
            table.specificType("focus_groups", "muscle_group[]");
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("exercise")
        .raw("DROP TYPE muscle_group");
}

