import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const maxQueries: Partial<QueryResolvers> = {
    maxes: async (parent, args, { dataSources, user }) => {
        let maxEntities;
        const input = args.input;
        if (input) {
            maxEntities = await dataSources.maxRepo.filteredAndSorted(input.filter.type, input.sort.date, user.id);
        } else {
            maxEntities = await dataSources.maxRepo.index(user.id);
        }
        return maxEntities;
    }
};

export const maxMutations: Partial<MutationResolvers> = {
    addMax: async (parent, args, { dataSources, user }) => {
        const createdMax = await dataSources.maxRepo.add(args.input, user.id);
        return { max: createdMax, success: !!createdMax };
    },
    deleteMax: async (parent, args, { dataSources, user }) => {
        const success = await dataSources.maxRepo.delete(args.input.id, user.id);
        return {success, id: args.input.id};
    }
};
