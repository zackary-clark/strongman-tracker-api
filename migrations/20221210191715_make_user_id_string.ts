import { Knex } from "knex";

const USER_ID = "user_id";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable("exercise", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("lift", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("max", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("program", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("programmed_exercise", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("programmed_workout", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        })
        .alterTable("user_preferences", tableBuilder => {
            tableBuilder.string("id").alter({alterNullable: false});
        })
        .alterTable("workout", tableBuilder => {
            tableBuilder.string(USER_ID).alter({alterNullable: false});
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable("exercise", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("lift", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("max", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("program", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("programmed_exercise", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("programmed_workout", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        })
        .alterTable("user_preferences", tableBuilder => {
            tableBuilder.uuid("id").alter({alterNullable: false});
        })
        .alterTable("workout", tableBuilder => {
            tableBuilder.uuid(USER_ID).alter({alterNullable: false});
        });
}

