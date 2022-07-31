import { QueryResolvers } from "../../generated/schema";

export const exerciseQueries: Partial<QueryResolvers> = {
    exercises: async (parent, args, { dataSources }) => {
        let exercises;
        const input = args.input;
        if (input) {
            exercises = await dataSources.exerciseRepo.filteredAndSorted(input.filter.focusGroup, input.sort.name);
        } else {
            exercises = await dataSources.exerciseRepo.index();
        }
        return exercises;
    },
    exercise: async (parent, args, { dataSources }) => {
        return await dataSources.exerciseRepo.findOneExercise(args.input.id);
    }
};
