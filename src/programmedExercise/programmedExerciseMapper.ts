import { MakeOptional, Maybe, ProgrammedExercise, Protocol } from "../../generated/schema";
import { ProgrammedExerciseEditableFields } from "./ProgrammedExerciseRepo";

export interface ProgrammedExerciseEntity {
    id?: Maybe<string>,
    user_id: string,
    programmed_workout: string,
    exercise: string
    training_max?: Maybe<number>,
    order?: Maybe<number>,
    protocol?: Maybe<Protocol>
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
        training_max: from.trainingMax,
        order: from.order,
        protocol: from.protocol,
    };
}

function partialToEntity(from: ProgrammedExerciseEditableFields): Partial<ProgrammedExerciseEntity> {
    return {
        training_max: from.trainingMax,
        order: from.order,
        protocol: from.protocol,
    };
}

function toQL(from: ProgrammedExerciseEntity): ProgrammedExercisePreResolver {
    if (!from.id) throw new Error("Cannot map from entity to QL with no id.");
    return {
        id: from.id,
        programmedWorkout: from.programmed_workout,
        exercise: from.exercise,
        trainingMax: from.training_max,
        order: from.order,
        protocol: from.protocol,
    };
}

export default {
    toEntity,
    partialToEntity,
    toQL,
};
