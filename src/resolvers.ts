import { Resolvers } from "../generated/schema";
import { dateScalar } from "./dateScalar";
import { maxRepo } from "./max/maxRepo";

export const resolvers: Resolvers = {
    Query: {
        async maxes() {
            return await maxRepo.index();
        }
    },
    Mutation: {
        async addMax(parent, args) {
            const createdMax = await maxRepo.add(args.input);
            return { max: createdMax, success: !!createdMax };
        },
        async deleteMax(parent, args) {
            const success = await maxRepo.delete(args.input.id);
            return { success };
        }
    },
    Date: dateScalar
};
