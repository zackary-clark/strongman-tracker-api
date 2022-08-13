import { DayOfWeek, MakeOptional, Maybe, ProgrammedWorkout } from "../../generated/schema";
import { muscleGroupArrayToString, muscleGroupStringToArray } from "../utils/muscleGroupArrayMapper";
import { ProgrammedWorkoutEditableFields, ProgrammedWorkoutsEntityEditableFields } from "./ProgrammedWorkoutRepo";

export interface ProgrammedWorkoutEntity {
    id?: Maybe<string>,
    user_id: string,
    program: string,
    name: string,
    order?: Maybe<number>,
    description?: Maybe<string>,
    focus_groups?: Maybe<string>,
    day?: Maybe<string>,
}

function toEntity(from: MakeOptional<ProgrammedWorkout, "id" | "focusGroups">, userId: string): ProgrammedWorkoutEntity {
    return {
        id: from.id,
        user_id: userId,
        program: from.program,
        name: from.name,
        order: from.order,
        description: from.description,
        focus_groups: muscleGroupArrayToString(from.focusGroups),
        day: from.day,
    };
}

function partialToEntity(from: ProgrammedWorkoutEditableFields): ProgrammedWorkoutsEntityEditableFields {
    return {
        name: from.name,
        order: from.order,
        description: from.description,
        focus_groups: muscleGroupArrayToString(from.focusGroups),
        day: from.day,
    };
}

function toQL(from: ProgrammedWorkoutEntity): ProgrammedWorkout {
    if (!from.id) throw new Error("Cannot map from entity to QL with no id.");
    return {
        id: from.id,
        program: from.program,
        name: from.name,
        order: from.order,
        description: from.description,
        focusGroups: muscleGroupStringToArray(from.focus_groups),
        day: from.day as DayOfWeek,
    };
}

export default {
    toEntity,
    toQL,
    partialToEntity,
};
