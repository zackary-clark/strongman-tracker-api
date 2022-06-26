import { MutationResolvers } from "../../generated/schema";

export const liftMutations: Partial<MutationResolvers> = {
    addLift: async (parent, args, {dataSources}) => {
        const createdLift = await dataSources.liftRepo.addLift(args.input);
        // TODO: Don't use args to produce payload, instead use returned lift and spend the time to deal with the types
        return {lift: createdLift, success: !!createdLift, workout: args.input.workout};
    },
    deleteLift: async (parent, args, {dataSources}) => {
        const success = await dataSources.liftRepo.deleteLift(args.input.id);
        return {success, id: args.input.id};
    }
};
