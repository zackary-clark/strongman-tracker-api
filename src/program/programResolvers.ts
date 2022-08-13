import { MutationResolvers, ProgramResolvers, QueryResolvers } from "../../generated/schema";

export const programQueries: Partial<QueryResolvers> = {
    programs: async (parent, args, { dataSources, user }) => {
        return await dataSources.programRepo.index(user.id);
    },
    program: async (parent, args, { dataSources, user }) => {
        return await dataSources.programRepo.findOne(user.id, args.input.id);
    }
};

export const programMutations: Partial<MutationResolvers> = {
    addProgram: async (parent, args, { dataSources, user }) => {
        const createdProgram = await dataSources.programRepo.create(user.id, args.input);
        return { program: createdProgram, success: !!createdProgram };
    },
    renameProgram: async (parent, args, { dataSources, user }) => {
        const editedProgram = await dataSources.programRepo.edit(
            user.id,
            args.input.id,
            { name: args.input.name }
        );
        return { program: editedProgram, success: !!editedProgram };
    },
    changeProgramDescription: async (parent, args, { dataSources, user }) => {
        const editedProgram = await dataSources.programRepo.edit(
            user.id,
            args.input.id,
            { description: args.input.description }
        );
        return { program: editedProgram, success: !!editedProgram };
    }
};

export const programResolvers: ProgramResolvers = {
    workouts: async (parent, args, { dataSources, user }) => {
        return await dataSources.programmedWorkoutRepo.findAllWithProgramId(user.id, parent.id);
    },
};
