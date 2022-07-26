import { MutationResolvers, QueryResolvers, WorkoutResolvers } from "../../generated/schema";

export const workoutQueries: Partial<QueryResolvers> = {
    workouts: async (parent, args, { dataSources, user }) => {
        return await dataSources.workoutRepo.findAllWorkouts(user.id);
    },
    workout: async (parent, args, { dataSources, user }) => {
        return await dataSources.workoutRepo.findOneWorkout(args.input.id, user.id);
    }
};

export const workoutMutations: Partial<MutationResolvers> = {
    addWorkout: async (parent, args, { dataSources, user }) => {
        const createdWorkout = await dataSources.workoutRepo.addWorkout(args.input, user.id);
        return { workout: createdWorkout, success: !!createdWorkout };
    },
    deleteWorkout: async (parent, args, { dataSources, user }) => {
        const success = await dataSources.workoutRepo.deleteWorkoutAndAssociatedLifts(args.input.id, user.id);
        return { success, id: args.input.id };
    }
};

export const workoutResolvers: WorkoutResolvers = {
    lifts: async (parent, args, { dataSources, user }) => {
        return await dataSources.liftRepo.findAllLiftsWithWorkoutId(parent.id, user.id);
    }
};
