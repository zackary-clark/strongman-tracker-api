import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const maxQueries: Partial<QueryResolvers> = {
    maxes: (parent, args, { dataSources }) => {
        return dataSources.maxRepo.index();
    }
};

export const maxMutations: Partial<MutationResolvers> = {
    addMax: async (parent, args, {dataSources}) => {
        const createdMax = await dataSources.maxRepo.add(args.input);
        return {max: createdMax, success: !!createdMax};
    },
    deleteMax: async (parent, args, {dataSources}) => {
        const success = await dataSources.maxRepo.delete(args.input.id);
        return {success};
    }
};
