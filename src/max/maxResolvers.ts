import { UserInputError } from "apollo-server-express";
import { AddMaxInput, Max, MaxType, MutationResolvers, QueryResolvers } from "../../generated/schema";

export const maxQueries: Partial<QueryResolvers> = {
    maxes: async (parent, args, { dataSources, user }) => {
        const maxEntities = await dataSources.maxRepo.index(user.id);
        console.log(maxEntities);
        const maxes: Max[] = maxEntities.map((max: Max) => ({
            id: max.id,
            date: max.date,
            weight: max.weight,
            type: max.type,
            squat1RM: (max.type === "squat" ? max.weight / 1000 : undefined),
            bench1RM: (max.type === "bench" ? max.weight / 1000 : undefined),
            deadlift1RM: (max.type === "deadlift" ? max.weight / 1000 : undefined),
            press1RM: (max.type === "press" ? max.weight / 1000 : undefined)
        }));
        return maxes;
    }
};

export const maxMutations: Partial<MutationResolvers> = {
    addMax: async (parent, args, { dataSources, user }) => {
        const toSave = mapInputToMaxEntities(args.input);
        let createdMax;
        for (const max of toSave) {
            createdMax = await dataSources.maxRepo.add(max, user.id);
        }
        return {
            max: {
                // @ts-ignore
                id: createdMax.id,
                // @ts-ignore
                date: createdMax.date,
                // @ts-ignore
                weight: createdMax.weight,
                // @ts-ignore
                type: createdMax.type,
                // @ts-ignore
                squat1RM: (createdMax.type === "squat" ? createdMax.weight / 1000 : undefined),
                // @ts-ignore
                bench1RM: (createdMax.type === "bench" ? createdMax.weight / 1000 : undefined),
                // @ts-ignore
                deadlift1RM: (createdMax.type === "deadlift" ? createdMax.weight / 1000 : undefined),
                // @ts-ignore
                press1RM: (createdMax.type === "press" ? createdMax.weight / 1000 : undefined)
            }, success: !!createdMax
        };
    },
    deleteMax: async (parent, args, { dataSources, user }) => {
        const success = await dataSources.maxRepo.delete(args.input.id, user.id);
        return {success, id: args.input.id};
    }
};

function mapInputToMaxEntities(input: AddMaxInput): AddMaxInput[] {
    const result: AddMaxInput[] = [];
    if (input.squat1RM) {
        result.push({
            date: input.date,
            weight: (input.squat1RM * 1000),
            type: MaxType.Squat
        });
    }
    if (input.bench1RM) {
        result.push({
            date: input.date,
            weight: (input.bench1RM * 1000),
            type: MaxType.Bench
        });
    }
    if (input.deadlift1RM) {
        result.push({
            date: input.date,
            weight: (input.deadlift1RM * 1000),
            type: MaxType.Deadlift
        });
    }
    if (input.press1RM) {
        result.push({
            date: input.date,
            weight: (input.press1RM * 1000),
            type: MaxType.Press
        });
    }
    if (input.weight && input.type) {
        result.push({
            date: input.date,
            weight: input.weight,
            type: input.type
        });
    }
    if (result.length === 0) throw new UserInputError("MaxInput doesn't follow NEW or OLD version");
    return result;
}
