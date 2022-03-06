import { Resolvers } from "../generated/schema";
import { dateScalar } from "./dateScalar";

export const resolvers: Resolvers = {
    Query: {
        maxes: (parent, args, { dataSources }) => {
            return dataSources.maxRepo.index();
        },
    },
    Mutation: {
        addMax: async (parent, args, {dataSources}) => {
            const createdMax = await dataSources.maxRepo.add(args.input);
            return {max: createdMax, success: !!createdMax};
        },
        deleteMax: async (parent, args, {dataSources}) => {
            const success = await dataSources.maxRepo.delete(args.input.id);
            return {success};
        }
    },
    Date: dateScalar
};
