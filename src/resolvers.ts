import { Resolvers } from "../generated/schema";
import { dateScalar } from "./dateScalar";
import { liftMutations } from "./lift/liftResolvers";
import { maxMutations, maxQueries } from "./max/maxResolvers";
import { workoutMutations, workoutQueries, workoutResolvers } from "./workout/workoutResolvers";

export const resolvers: Resolvers = {
    Query: {
        ...maxQueries,
        ...workoutQueries
    },
    Mutation: {
        ...maxMutations,
        ...workoutMutations,
        ...liftMutations
    },
    Workout: workoutResolvers,
    Date: dateScalar
};
