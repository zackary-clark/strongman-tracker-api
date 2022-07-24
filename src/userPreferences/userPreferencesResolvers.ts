import { MutationResolvers, QueryResolvers } from "../../generated/schema";

export const userPreferencesQueries: Partial<QueryResolvers> = {
    preferences: async (parent, args, { dataSources, user }) => {
        return await dataSources.userPreferencesRepo.findOrCreate(user.id);
    }
};

export const userPreferencesMutations: Partial<MutationResolvers> = {
    changeWeightUnitPreference: async (parent, args, { dataSources, user }) => {
        const initialPreferences = await dataSources.userPreferencesRepo.findOrCreate(user.id);
        const savedPreferences = await dataSources.userPreferencesRepo.edit(
            user.id,
            {
                ...initialPreferences,
                weightUnit: args.input.weightUnit
            }
        );
        return { success: !!savedPreferences, preferences: savedPreferences };
    }
};
