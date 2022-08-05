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
    },
    renameExercise: async (parent, args, { dataSources, user }) => {
        const editedExercise = await dataSources.exerciseRepo.editExercise(
            user.id,
            args.input.id,
            { name: args.input.name }
        );
        return { exercise: editedExercise, success: !!editedExercise };
    },
    changeExerciseDescription: async (parent, args, { dataSources, user }) => {
        const editedExercise = await dataSources.exerciseRepo.editExercise(
            user.id,
            args.input.id,
            { description: args.input.description }
        );
        return { exercise: editedExercise, success: !!editedExercise };
    },
    changeExerciseFocusGroup: async (parent, args, { dataSources, user }) => {
        const editedExercise = await dataSources.exerciseRepo.editExercise(
            user.id,
            args.input.id,
            { focusGroups: args.input.focusGroups }
        );
        return { exercise: editedExercise, success: !!editedExercise };
    },
};
