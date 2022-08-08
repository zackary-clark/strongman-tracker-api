import { AddProgramInput, Program } from "../../generated/schema";

export interface ProgramEntity {
    id: string,
    name: string,
    description?: string | null,
    user_id: string,
}

function toEntity(from: AddProgramInput, userId: string): ProgramEntity;
function toEntity(from: Program, userId: string): ProgramEntity;
function toEntity(from: Program | AddProgramInput, userId: string): ProgramEntity {
    return {
        id: (from as Program).id,
        user_id: userId,
        name: from.name,
        description: from.description,
    };
}

function partialToEntity(from: Partial<Program>): Partial<Omit<ProgramEntity, "user_id">> {
    return {
        id: from.id,
        name: from.name,
        description: from.description
    };
}

function toQL(from: ProgramEntity): Program {
    return {
        id: from.id,
        name: from.name,
        description: from.description,
    };
}

export default {
    toEntity,
    toQL,
    partialToEntity,
};
