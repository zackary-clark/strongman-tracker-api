import { Maybe, MuscleGroup } from "../../generated/schema";

export const muscleGroupStringToArray = (s?: string | null): MuscleGroup[] | null | undefined => {
    if (typeof s === "string") {
        const strippedBrackets = s.substring(1, s.length - 1);
        // @ts-ignore
        return strippedBrackets.split(",");
    } else {
        return s;
    }
};

export const muscleGroupArrayToString = (groups?: Maybe<MuscleGroup[]>): string | null | undefined => {
    if (groups === null || groups?.length === 0) {
        return null;
    } else if (!groups || groups.length < 1) {
        return undefined;
    } else {
        return "{" + groups.join(",") + "}";
    }
};
