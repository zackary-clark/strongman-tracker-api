import { pgClient } from "../index";
import { logError } from "../utils";
import { CreateMaxInput, Max } from "./schema";

class MaxRepo {
    public async index(): Promise<Max[]> {
        return pgClient<Max>("max").select("*");
    }

    public async create(max: CreateMaxInput): Promise<Max> {
        try {
            return pgClient<Max>("max").insert({...max});
        } catch (error) {
            logError(error, "Max Create Failed");
            throw error;
        }
    }
}

export default MaxRepo;
