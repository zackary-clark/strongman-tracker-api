import { AddExerciseInput, Exercise, MuscleGroup } from "../../generated/schema";

export interface ExerciseEntity {
    id: string,
    name: string,
    description?: string | null,
    focus_groups?: string | null,
    user_id?: string,
}

function toEntity(from: AddExerciseInput, userId: string): ExerciseEntity;
function toEntity(from: Exercise, userId: string): ExerciseEntity;
function toEntity(from: Exercise | AddExerciseInput, userId: string): ExerciseEntity {
    return {
        id: (from as Exercise).id,
        user_id: userId,
        name: from.name,
        description: from.description,
        focus_groups: focusGroupArrayToString(from.focusGroups)
    };
}

function partialToEntity(from: Partial<Exercise>): Partial<Omit<ExerciseEntity, "user_id">> {
    return {
        id: from.id,
        name: from.name,
        description: from.description,
        focus_groups: focusGroupArrayToString(from.focusGroups)
    };
}

const toQL = (entity: ExerciseEntity): Exercise => ({
    id: entity.id,
    name: entity.name,
    description: entity.description,
    focusGroups: focusGroupStringToArray(entity.focus_groups)
});

const focusGroupStringToArray = (s?: string | null): MuscleGroup[] => {
    if (!s) {
        return [];
    } else {
        const strippedBrackets = s.substring(1, s.length - 1);
        // @ts-ignore
        return strippedBrackets.split(",");
    }
};

const focusGroupArrayToString = (groups?: MuscleGroup[]): string | undefined => {
    if (!groups || groups.length < 1) {
        return undefined;
    } else {
        return "{" + groups.join(",") + "}";
    }
};

export default {
    toEntity,
    toQL,
    partialToEntity,
};
