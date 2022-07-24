import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_preferences", (table: Knex.CreateTableBuilder) => {
        table.uuid("id").primary();
        table
            .enum("weight_unit", ["kg", "lb"], {useNative: true, enumName: "weight_unit"})
            .notNullable()
            .defaultTo("kg");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("user_preferences")
        .raw("DROP TYPE weight_unit");
}

