import { AddMaxInput, Max } from "../../generated/schema";
import dbClient from "../dbClient";
import { logError } from "../utils";

class MaxRepo {
    public async index(): Promise<Max[]> {
        return dbClient<Max>("max").select("*");
    }

    public async add(max: AddMaxInput): Promise<Max> {
        try {
            const insertedMaxArray = await dbClient<Max>("max").insert({...max}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }
}

export const maxRepo = new MaxRepo();
