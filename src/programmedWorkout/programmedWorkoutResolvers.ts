import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const programmedWorkoutQueries: Partial<QueryResolvers> = {
    programmedWorkout: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedWorkoutRepo.findOne(user.id, args.input.id);
    },
    programmedWorkouts: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedWorkoutRepo.filteredAndSorted(user.id, args.input.filter, args.input.sort);
    },
};

export const programmedWorkoutMutations: Partial<MutationResolvers> = {
    addProgrammedWorkout: async (parent, args, { dataSources, user }) => {
        const newProgrammedWorkout = await dataSources.programmedWorkoutRepo.create(user.id, args.input);
        return { success: !!newProgrammedWorkout, programmedWorkout: newProgrammedWorkout };
    },
    renameProgrammedWorkout: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedWorkoutRepo.edit(
            user.id,
            args.input.id,
            { name: args.input.name }
        );
        return { success: !!edited, programmedWorkout: edited };
    },
    changeProgrammedWorkoutOrder: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedWorkoutRepo.edit(
            user.id,
            args.input.id,
            { order: args.input.order ?? null }
        );
        return { success: !!edited, programmedWorkout: edited };
    },
    changeProgrammedWorkoutDescription: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedWorkoutRepo.edit(
            user.id,
            args.input.id,
            { description: args.input.description ?? null }
        );
        return { success: !!edited, programmedWorkout: edited };
    },
    changeProgrammedWorkoutFocusGroups: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedWorkoutRepo.edit(
            user.id,
            args.input.id,
            { focusGroups: args.input.focusGroups ?? null }
        );
        return { success: !!edited, programmedWorkout: edited };
    },
    changeProgrammedWorkoutDay: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedWorkoutRepo.edit(
            user.id,
            args.input.id,
            { day: args.input.day ?? null }
        );
        return { success: !!edited, programmedWorkout: edited };
    },
};
