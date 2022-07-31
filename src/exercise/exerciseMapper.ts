import { Exercise, MuscleGroup } from "../../generated/schema";

export interface ExerciseEntity {
    id: string,
    name: string,
    description?: string | null,
    focus_groups?: string | null,
}

const toEntity = (ql: Exercise): ExerciseEntity => ({
    id: ql.id,
    name: ql.name,
    description: ql.description,
    focus_groups: focusGroupArrayToString(ql.focusGroups)
});

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

const focusGroupArrayToString = (groups: MuscleGroup[]): string | null => {
    if (!groups || groups.length < 1) {
        return null;
    } else {
        return "{" + groups.join(",") + "}";
    }
};

export default {
    toEntity,
    toQL
};
