import { SQLDataSource } from "datasource-sql";
import { AddMaxInput, Max } from "../../generated/schema";
import { logError } from "../utils/logs";

const TABLE_NAME = "max";

export class MaxRepo extends SQLDataSource {
    public index(userId: string): Max[] {
        return this.knex.select("*").from(TABLE_NAME).where("user_id", userId);
    }

    public async add(max: AddMaxInput, userId: string): Promise<Max> {
        try {
            const insertedMaxArray = await this.knex.into(TABLE_NAME).insert({...max, ["user_id"]: userId}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }

    public async delete(id: string, userId: string): Promise<boolean> {
        try {
            await this.knex.from(TABLE_NAME).where("id", id).andWhere("user_id", userId).del();
            return true;
        } catch (error) {
            logError(error, "Delete Max Failed");
            return false;
        }
    }
}
