import { maxRepo } from "./repo";
import { CreateMaxInput, Max } from "./schema";

class MaxService {
    public async index(): Promise<Max[]> {
        return await maxRepo.index();
    }

    public async create(max: CreateMaxInput): Promise<Max> {
        return await maxRepo.create(max);
    }
}

export const maxService = new MaxService();
