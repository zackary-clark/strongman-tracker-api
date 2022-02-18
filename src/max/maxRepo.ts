import { AddMaxInput, Max } from "../../generated/schema";
import dbClient from "../dbClient";
import { logError } from "../utils";

class MaxRepo {
    private readonly maxDbClient;

    public constructor() {
        this.maxDbClient = dbClient<Max>("max");
    }

    public async index(): Promise<Max[]> {
        return this.maxDbClient.select("*");
    }

    public async add(max: AddMaxInput): Promise<Max> {
        try {
            const insertedMaxArray = await this.maxDbClient.insert({...max}, "*");
            return insertedMaxArray[0];
        } catch (error) {
            logError(error, "Add Max Failed");
            throw error;
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            await this.maxDbClient.where("id", id).del();
            return true;
        } catch (error) {
            logError(error, "Delete Max Failed");
            return false;
        }
    }
}

export const maxRepo = new MaxRepo();
