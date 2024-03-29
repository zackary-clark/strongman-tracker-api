import { SQLDataSource } from "datasource-sql";
import { AddMaxInput, Max, MaxType, Sort } from "../../generated/schema";
import { logError } from "../utils/logs";

const TABLE = "max";

export class MaxRepo extends SQLDataSource {
    public async index(userId: string): Promise<Max[]> {
        return this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .orderBy("date", Sort.Desc);
    }

    public async filteredAndSorted(type: MaxType, dateSort: Sort, userId: string): Promise<Max[]> {
        return this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .andWhere("type", type)
            .orderBy("date", dateSort);
    }

    public async add(max: AddMaxInput, userId: string): Promise<Max> {
        try {
            const insertedMaxArray = await this.knex.into(TABLE).insert({...max, ["user_id"]: userId}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }

    public async delete(id: string, userId: string): Promise<boolean> {
        try {
            await this.knex.from(TABLE).where("id", id).andWhere("user_id", userId).del();
            return true;
        } catch (error) {
            logError(error, "Delete Max Failed");
            return false;
        }
    }
}
