import { Resolvers } from "../../../generated/schema";
import { exerciseMutations, exerciseQueries } from "../../exercise/exerciseResolvers";
import { liftMutations } from "../../lift/liftResolvers";
import { maxMutations, maxQueries } from "../../max/maxResolvers";
import { programMutations, programQueries, programResolvers } from "../../program/programResolvers";
import {
    programmedExerciseMutations,
    programmedExerciseQueries,
    programmedExerciseResolvers,
} from "../../programmedExercise/programmedExerciseResolvers";
import {
    programmedWorkoutMutations,
    programmedWorkoutQueries,
    programmedWorkoutResolvers,
} from "../../programmedWorkout/programmedWorkoutResolvers";
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
        ...programmedWorkoutQueries,
        ...programmedExerciseQueries,
    },
    Mutation: {
        ...maxMutations,
        ...workoutMutations,
        ...liftMutations,
        ...userPreferencesMutations,
        ...exerciseMutations,
        ...programMutations,
        ...programmedWorkoutMutations,
        ...programmedExerciseMutations,
    },
    Workout: workoutResolvers,
    Program: programResolvers,
    ProgrammedWorkout: programmedWorkoutResolvers,
    ProgrammedExercise: programmedExerciseResolvers,
    Date: dateScalar,
};
