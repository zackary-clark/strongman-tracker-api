import { MakeOptional, Maybe, ProgrammedExercise } from "../../generated/schema";
import { ProgrammedExerciseEditableFields } from "./ProgrammedExerciseRepo";

export interface ProgrammedExerciseEntity {
    id?: Maybe<string>,
    user_id: string,
    programmed_workout: string,
    exercise: string,
    order?: Maybe<number>,
}

export interface ProgrammedExercisePreResolver extends Omit<ProgrammedExercise, "exercise"> {
    exercise: string,
}

function toEntity(from: MakeOptional<ProgrammedExercisePreResolver, "id">, userId: string): ProgrammedExerciseEntity {
    return {
        id: from.id,
        user_id: userId,
        programmed_workout: from.programmedWorkout,
        exercise: from.exercise,
        order: from.order,
    };
}

function partialToEntity(from: ProgrammedExerciseEditableFields): Partial<ProgrammedExerciseEntity> {
    return {
        order: from.order,
    };
}

function toQL(from: ProgrammedExerciseEntity): ProgrammedExercisePreResolver {
    if (!from.id) throw new Error("Cannot map from entity to QL with no id.");
    return {
        id: from.id,
        programmedWorkout: from.programmed_workout,
        exercise: from.exercise,
        order: from.order,
    };
}

export default {
    toEntity,
    partialToEntity,
    toQL,
};
