import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const exerciseQueries: Partial<QueryResolvers> = {
    exercises: async (parent, args, { dataSources, user }) => {
        let exercises;
        const input = args.input;
        if (input) {
            exercises = await dataSources.exerciseRepo.filteredAndSorted(user.id, input.sort.name, input.filter.focusGroup ?? null, input.filter.custom ?? null);
        } else {
            exercises = await dataSources.exerciseRepo.index(user.id);
        }
        return exercises;
    },
    exercise: async (parent, args, { dataSources, user }) => {
        return await dataSources.exerciseRepo.findOneExercise(user.id, args.input.id);
    }
};

export const exerciseMutations: Partial<MutationResolvers> = {
    addExercise: async (parent, args, { dataSources, user }) => {
        const createdExercise = await dataSources.exerciseRepo.createCustomExercise(user.id, args.input);
        return { exercise: createdExercise, success: !!createdExercise };
    }
};
