import dbClient from "../dbClient";
import { logError } from "../utils";
import { CreateMaxInput, Max } from "./schema";

class MaxRepo {
    public async index(): Promise<Max[]> {
        return dbClient<Max>("max").select("*");
    }

    public async create(max: CreateMaxInput): Promise<Max> {
        try {
            return dbClient<Max>("max").insert({...max});
        } catch (error) {
            logError(error, "Max Create Failed");
            throw error;
        }
    }
}

export const maxRepo = new MaxRepo();
