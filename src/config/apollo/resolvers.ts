import { Resolvers } from "../../../generated/schema";
import { exerciseMutations, exerciseQueries } from "../../exercise/exerciseResolvers";
import { liftMutations } from "../../lift/liftResolvers";
import { maxMutations, maxQueries } from "../../max/maxResolvers";
import { programMutations, programQueries } from "../../program/programResolvers";
import { userPreferencesMutations, userPreferencesQueries } from "../../userPreferences/userPreferencesResolvers";
import { workoutMutations, workoutQueries, workoutResolvers } from "../../workout/workoutResolvers";
import { dateScalar } from "./dateScalar";

export const resolvers: Resolvers = {
    Query: {
        ...maxQueries,
        ...workoutQueries,
        ...userPreferencesQueries,
        ...exerciseQueries,
        ...programQueries,
    },
    Mutation: {
        ...maxMutations,
        ...workoutMutations,
        ...liftMutations,
        ...userPreferencesMutations,
        ...exerciseMutations,
        ...programMutations,
    },
    Workout: workoutResolvers,
    Date: dateScalar,
};
