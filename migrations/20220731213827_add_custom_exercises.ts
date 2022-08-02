import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("exercise", (table) => {
        table.uuid("user_id").index();
        table.boolean("custom").defaultTo(false).notNullable();
        table.boolean("custom").defaultTo(true).index().alter({alterNullable: false});
    }).raw(
        "ALTER TABLE exercise ADD CONSTRAINT custom_or_global_exercise_constraint " +
        "CHECK ((user_id IS NOT NULL AND custom = true) OR (user_id IS NULL AND custom = false))"
    );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .raw(
            "DELETE FROM exercise WHERE user_id IS NOT NULL OR custom = true;"
        ).alterTable("exercise", (table) => {
            table.dropChecks("custom_or_global_exercise_constraint");
            table.dropColumn("user_id");
            table.dropColumn("custom");
    });
}

