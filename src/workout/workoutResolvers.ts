import { MutationResolvers, QueryResolvers, WorkoutResolvers } from "../../generated/schema";

export const workoutQueries: Partial<QueryResolvers> = {
    workouts: (parent, args, {dataSources}) => {
        return dataSources.workoutRepo.findAllWorkouts();
    },
    workout: (parent, args, {dataSources}) => {
        return dataSources.workoutRepo.findOneWorkout(args.input.id);
    }
};

export const workoutMutations: Partial<MutationResolvers> = {
    addWorkout: async (parent, args, {dataSources}) => {
        const createdWorkout = await dataSources.workoutRepo.addWorkout(args.input);
        return {workout: createdWorkout, success: !!createdWorkout};
    },
    deleteWorkout: async (parent, args, {dataSources}) => {
        const success = await dataSources.workoutRepo.deleteWorkoutAndAssociatedLifts(args.input.id);
        return {success};
    }
};

export const workoutResolvers: WorkoutResolvers = {
    lifts: async (parent, args, {dataSources}) => {
        return dataSources.liftRepo.findAllLiftsWithWorkoutId(parent.id);
    }
};
