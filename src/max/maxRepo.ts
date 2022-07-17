import { SQLDataSource } from "datasource-sql";
import { AddMaxInput, Max } from "../../generated/schema";
import { logError } from "../utils/logs";

const TABLE_NAME = "max";

export class MaxRepo extends SQLDataSource {
    public index(): Max[] {
        return this.knex.select("*").from(TABLE_NAME);
    }

    public async add(max: AddMaxInput): Promise<Max> {
        try {
            const insertedMaxArray = await this.knex.into(TABLE_NAME).insert({...max}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            await this.knex.from(TABLE_NAME).where("id", id).del();
            return true;
        } catch (error) {
            logError(error, "Delete Max Failed");
            return false;
        }
    }
}
