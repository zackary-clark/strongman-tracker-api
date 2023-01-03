import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const userExerciseUnitQueries: Partial<QueryResolvers> = {
    userExerciseUnit: async (parent, args, { dataSources, user }) => {
        const userExerciseUnit = await dataSources.userExerciseUnitRepo.find(user.id, args.input.exercise);
        const userPreferences = await dataSources.userPreferencesRepo.findOrCreate(user.id);
        return {
            exercise: args.input.exercise,
            weightUnit: userExerciseUnit?.weight_unit ?? userPreferences.weightUnit,
            lengthUnit: userExerciseUnit?.length_unit ?? userPreferences.lengthUnit,
        };
    }
};

export const userExerciseUnitMutations: Partial<MutationResolvers> = {
    changeUserExerciseWeightUnit: async (parent, args, { dataSources, user }) => {
        const userExerciseUnit = await dataSources.userExerciseUnitRepo.upsert(
            user.id,
            {
                exercise: args.input.exercise,
                weightUnit: args.input.weightUnit,
            });
        const userPreferences = await dataSources.userPreferencesRepo.findOrCreate(user.id);
        return {
            success: !!userExerciseUnit,
            userExerciseUnit: {
                exercise: userExerciseUnit.exercise,
                weightUnit: userExerciseUnit?.weight_unit ?? userPreferences.weightUnit,
                lengthUnit: userExerciseUnit?.length_unit ?? userPreferences.lengthUnit,
            }
        };
    },
    changeUserExerciseLengthUnit: async (parent, args, { dataSources, user }) => {
        const userExerciseUnit = await dataSources.userExerciseUnitRepo.upsert(
            user.id,
            {
                exercise: args.input.exercise,
                lengthUnit: args.input.lengthUnit,
            });
        const userPreferences = await dataSources.userPreferencesRepo.findOrCreate(user.id);
        return {
            success: !!userExerciseUnit,
            userExerciseUnit: {
                exercise: userExerciseUnit.exercise,
                weightUnit: userExerciseUnit?.weight_unit ?? userPreferences.weightUnit,
                lengthUnit: userExerciseUnit?.length_unit ?? userPreferences.lengthUnit,
            }
        };
    },
};
