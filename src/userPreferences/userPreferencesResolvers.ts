import { MutationResolvers, QueryResolvers, UserPreferences, UserPreferencesEditPayload } from "../../generated/schema";
import { UserPreferencesRepo } from "./UserPreferencesRepo";

export const userPreferencesQueries: Partial<QueryResolvers> = {
    preferences: async (parent, args, { dataSources, user }) => {
        return await dataSources.userPreferencesRepo.findOrCreate(user.id);
    }
};

export const userPreferencesMutations: Partial<MutationResolvers> = {
    changeWeightUnitPreference: async (parent, args, { dataSources, user }) => {
        return await editPreference(
            dataSources.userPreferencesRepo,
            user.id,
            { weightUnit: args.input.weightUnit }
        );
    },
    changeLengthUnitPreference: async (parent, args, { dataSources, user }) =>{
        return await editPreference(
            dataSources.userPreferencesRepo,
            user.id,
            { lengthUnit: args.input.lengthUnit }
        );
    },
};

const editPreference = async (
    repo: UserPreferencesRepo,
    userId: string,
    updatedFields: Partial<UserPreferences>
): Promise<UserPreferencesEditPayload> => {
    const initialPreferences = await repo.findOrCreate(userId);
    const savedPreferences = await repo.edit(
        userId,
        {
            ...initialPreferences,
            ...updatedFields,
        }
    );
    return { success: !!savedPreferences, preferences: savedPreferences };
};
