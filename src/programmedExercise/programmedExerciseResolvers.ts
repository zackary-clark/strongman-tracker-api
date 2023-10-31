import { MutationResolvers, ProgrammedExerciseResolvers, QueryResolvers } from "../../generated/schema";

export const programmedExerciseQueries: Partial<QueryResolvers> = {
    programmedExercise: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedExerciseRepo.findOne(user.id, args.input.id);
    },
    programmedExercises: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedExerciseRepo.filteredAndSorted(user.id, args.input?.filter, args.input?.sort);
    },
};

export const programmedExerciseMutations: Partial<MutationResolvers> = {
    addProgrammedExercise: async (parent, args, { dataSources, user }) => {
        const newProgrammedExercise = await dataSources.programmedExerciseRepo.create(user.id, args.input);
        return { success: !!newProgrammedExercise, programmedExercise: newProgrammedExercise };
    },
    changeProgrammedExerciseTrainingMax: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedExerciseRepo.edit(
            user.id,
            args.input.id,
            { trainingMax: args.input.trainingMax ?? null }
        );
        return { success: !!edited, programmedExercise: edited };
    },
    changeProgrammedExerciseOrder: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedExerciseRepo.edit(
            user.id,
            args.input.id,
            { order: args.input.order ?? null }
        );
        return { success: !!edited, programmedExercise: edited };
    },
    changeProgrammedExerciseProtocol: async (parent, args, { dataSources, user }) => {
        const edited = await dataSources.programmedExerciseRepo.edit(
            user.id,
            args.input.id,
            { protocol: args.input.protocol ?? null }
        );
        return { success: !!edited, programmedExercise: edited };
    },
    deleteProgrammedExercise: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedExerciseRepo.delete(user.id, args.input.id);
    },
};

export const programmedExerciseResolvers: ProgrammedExerciseResolvers = {
    exercise: async (parent, args, { dataSources, user }) => {
        return await dataSources.exerciseRepo.findOneExercise(user.id, parent.exercise);
    },
};
