import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("max", (table: Knex.AlterTableBuilder) => {
        table.integer("weight");
        table.enum(
            "type",
            ["deadlift", "press", "bench", "squat"],
            {useNative: true, enumName: "max_type"}
        );
    }).raw(
        "INSERT INTO max (date, weight, type, user_id) " +
        "SELECT date, (\"squat1RM\" * 1000), 'squat', user_id FROM max " +
        "WHERE \"squat1RM\" IS NOT NULL;"
    ).raw(
        "INSERT INTO max (date, weight, type, user_id) " +
        "SELECT date, (\"deadlift1RM\" * 1000), 'deadlift', user_id FROM max " +
        "WHERE \"deadlift1RM\" IS NOT NULL;"
    ).raw(
        "INSERT INTO max (date, weight, type, user_id) " +
        "SELECT date, (\"bench1RM\" * 1000), 'bench', user_id FROM max " +
        "WHERE \"bench1RM\" IS NOT NULL;"
    ).raw(
        "INSERT INTO max (date, weight, type, user_id)\n" +
        "SELECT date, (\"press1RM\" * 1000), 'press', user_id FROM max\n" +
        "WHERE \"press1RM\" IS NOT NULL;"
    ).raw(
        "DELETE FROM max " +
        "WHERE \"squat1RM\" IS NOT NULL " +
        "OR \"bench1RM\" IS NOT NULL " +
        "OR \"deadlift1RM\" IS NOT NULL " +
        "OR \"press1RM\" IS NOT NULL;"
    ).alterTable("max", (table: Knex.AlterTableBuilder) => {
        table.dropColumn("squat1RM");
        table.dropColumn("bench1RM");
        table.dropColumn("deadlift1RM");
        table.dropColumn("press1RM");
        table.dropNullable("weight");
        table.dropNullable("type");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("max", (table: Knex.AlterTableBuilder) => {
        table.float("squat1RM");
        table.float("bench1RM");
        table.float("deadlift1RM");
        table.float("press1RM");
        table.setNullable("weight");
        table.setNullable("type");
    }).raw(
        "INSERT INTO max (date, \"squat1RM\", user_id) " +
        "SELECT date, (weight / 1000), user_id FROM max " +
        "WHERE type = 'squat';"
    ).raw(
        "INSERT INTO max (date, \"bench1RM\", user_id) " +
        "SELECT date, (weight / 1000), user_id FROM max " +
        "WHERE type = 'bench';"
    ).raw(
        "INSERT INTO max (date, \"press1RM\", user_id) " +
        "SELECT date, (weight / 1000), user_id FROM max " +
        "WHERE type = 'press';"
    ).raw(
        "INSERT INTO max (date, \"deadlift1RM\", user_id) " +
        "SELECT date, (weight / 1000), user_id FROM max " +
        "WHERE type = 'deadlift';"
    ).raw(
        "DELETE FROM max " +
        "WHERE weight IS NOT NULL;"
    ).alterTable("max", (table: Knex.AlterTableBuilder) => {
        table.dropColumn("weight");
        table.dropColumn("type");
    }).raw("DROP TYPE max_type");
}

