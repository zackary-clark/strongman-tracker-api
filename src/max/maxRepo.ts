import { AddMaxInput, Max } from "../../generated/schema";
import dbClient from "../dbClient";
import { logError } from "../utils";

const TABLE_NAME = "max";

// TODO: Use SQLDataSource rather than self-rolling the "repo"
class MaxRepo {

    public async index(): Promise<Max[]> {
        return dbClient<Max>(TABLE_NAME).select("*");
    }

    public async add(max: AddMaxInput): Promise<Max> {
        try {
            const insertedMaxArray = await dbClient<Max>(TABLE_NAME).insert({...max}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            await dbClient<Max>(TABLE_NAME).where("id", id).del();
            return true;
        } catch (error) {
            logError(error, "Delete Max Failed");
            return false;
        }
    }
}

export const maxRepo = new MaxRepo();
