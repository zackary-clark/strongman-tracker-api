import { Resolvers } from "../../../generated/schema";
import { liftMutations } from "../../lift/liftResolvers";
import { maxMutations, maxQueries } from "../../max/maxResolvers";
import { userPreferencesMutations, userPreferencesQueries } from "../../userPreferences/userPreferencesResolvers";
import { workoutMutations, workoutQueries, workoutResolvers } from "../../workout/workoutResolvers";
import { dateScalar } from "./dateScalar";

export const resolvers: Resolvers = {
    Query: {
        ...maxQueries,
        ...workoutQueries,
        ...userPreferencesQueries
    },
    Mutation: {
        ...maxMutations,
        ...workoutMutations,
        ...liftMutations,
        ...userPreferencesMutations
    },
    Workout: workoutResolvers,
    Date: dateScalar
};
