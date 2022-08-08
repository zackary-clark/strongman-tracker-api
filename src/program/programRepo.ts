import { SQLDataSource } from "datasource-sql";
import { AddProgramInput, Program } from "../../generated/schema";
import { logError } from "../utils/logs";
import ProgramMapper, { ProgramEntity } from "./programMapper";

const TABLE = "program";

export class ProgramRepo extends SQLDataSource {

    public async index(userId: string): Promise<Program[]> {
        const programEntities: ProgramEntity[] = await this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .orderBy("name");
        return programEntities.map(ProgramMapper.toQL);
    }

    public async findOne(userId: string, id: string): Promise<Program> {
        return ProgramMapper.toQL(
            await this.knex
                .select("*").from(TABLE)
                .where("user_id", userId)
                .andWhere("id", id)
                .first()
        );
    }

    public async create(userId: string, input: AddProgramInput): Promise<Program> {
        try {
            const insertedEntities = await this.knex.into(TABLE)
                    .insert(ProgramMapper.toEntity({...input}, userId), "*");
            return ProgramMapper.toQL(insertedEntities[0]);
        } catch (error) {
            logError(error, "Create Program Failed");
            throw error;
        }
    }

    public async edit(userId: string, id: string, updatedField: Partial<Program>): Promise<Program> {
        try {
            const updatedEntities = await this.knex.from(TABLE)
                .update(ProgramMapper.partialToEntity(updatedField), "*")
                .where("id", id)
                .andWhere("user_id", userId);
            return ProgramMapper.toQL(updatedEntities[0]);
        } catch (error) {
            logError(error, "Edit Program Failed");
            throw error;
        }
    }
}