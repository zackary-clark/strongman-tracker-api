import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("user_preferences", (table: Knex.AlterTableBuilder) => {
        table
            .enum(
                "length_unit",
                ["cm", "in"],
                {useNative: true, enumName: "length_unit"}
            )
            .notNullable()
            .defaultTo("cm");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable("user_preferences", (table: Knex.AlterTableBuilder) => {
            table.dropColumn("length_unit");
        })
        .raw("DROP TYPE length_unit");
}

