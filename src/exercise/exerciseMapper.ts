import { AddExerciseInput, Exercise } from "../../generated/schema";
import { muscleGroupArrayToString, muscleGroupStringToArray } from "../utils/muscleGroupArrayMapper";

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
        focus_groups: muscleGroupArrayToString(from.focusGroups)
    };
}

function partialToEntity(from: Partial<Exercise>): Partial<Omit<ExerciseEntity, "user_id">> {
    return {
        id: from.id,
        name: from.name,
        description: from.description,
        focus_groups: muscleGroupArrayToString(from.focusGroups)
    };
}

const toQL = (entity: ExerciseEntity): Exercise => ({
    id: entity.id,
    name: entity.name,
    description: entity.description,
    focusGroups: muscleGroupStringToArray(entity.focus_groups) ?? []
});

export default {
    toEntity,
    toQL,
    partialToEntity,
};
