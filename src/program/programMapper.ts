import { AddProgramInput, Maybe, Program, Scalars } from "../../generated/schema";

export interface ProgramEntity {
    id: string,
    name: string,
    description?: string | null,
    user_id: string,
}

export interface ProgramPreResolver {
    __typename?: "Program";
    id: Scalars["ID"];
    name: Scalars["String"];
    description?: Maybe<Scalars["String"]>;
}

function toEntity(from: AddProgramInput, userId: string): ProgramEntity;
function toEntity(from: ProgramPreResolver, userId: string): ProgramEntity;
function toEntity(from: ProgramPreResolver | AddProgramInput, userId: string): ProgramEntity {
    return {
        id: (from as Program).id,
        user_id: userId,
        name: from.name,
        description: from.description,
    };
}

function partialToEntity(from: Partial<ProgramPreResolver>): Partial<Omit<ProgramEntity, "user_id">> {
    return {
        id: from.id,
        name: from.name,
        description: from.description
    };
}

function toQL(from: ProgramEntity): ProgramPreResolver {
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
