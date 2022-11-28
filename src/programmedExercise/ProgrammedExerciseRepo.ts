import { SQLDataSource } from "datasource-sql";
import {
    AddProgrammedExerciseInput, ProgrammedExercise,
    ProgrammedExercisesFilter,
    ProgrammedExercisesSort,
    Sort
} from "../../generated/schema";
import { KnexOrderByNullsOption } from "../config/knexConfig";
import { isDefined } from "../utils/isDefined";
import { logError } from "../utils/logs";
import ProgrammedExerciseMapper, { ProgrammedExercisePreResolver } from "./programmedExerciseMapper";

const TABLE = "programmed_exercise";

export class ProgrammedExerciseRepo extends SQLDataSource {
    public async findOne(userId: string, id: string): Promise<ProgrammedExercisePreResolver> {
        return ProgrammedExerciseMapper.toQL(await this.knex
            .select("*").from(TABLE)
            .where("id", id)
            .andWhere("user_id", userId)
            .first()
        );
    }

    public async filteredAndSorted(
        userId: string,
        filter?: ProgrammedExercisesFilter | null,
        sort?: ProgrammedExercisesSort | null,
    ): Promise<ProgrammedExercisePreResolver[]> {
        const programmedExerciseEntities = await this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .modify(queryBuilder => {
                const workout = filter?.programmedWorkout;
                if (isDefined(workout)) {
                    queryBuilder.where("programmed_workout", workout);
                }
            })
            .orderBy([{ column: "order", order: sort?.order ?? Sort.Asc, nulls: KnexOrderByNullsOption.last }]);
        return programmedExerciseEntities.map(ProgrammedExerciseMapper.toQL);
    }

    public async create(userId: string, input: AddProgrammedExerciseInput): Promise<ProgrammedExercisePreResolver> {
        try {
            const insertedEntities = await this.knex.into(TABLE)
                .insert(ProgrammedExerciseMapper.toEntity({...input}, userId), "*");
            return ProgrammedExerciseMapper.toQL(insertedEntities[0]);
        } catch (error) {
            logError(error, "Create Programmed Exercise Failed");
            throw error;
        }
    }

    public async edit(
        userId: string,
        id: string,
        updatedFields: Partial<ProgrammedExercise>
    ): Promise<ProgrammedExercisePreResolver> {
        try {
            const updatedEntities = await this.knex.from(TABLE)
                .update(ProgrammedExerciseMapper.partialToEntity(updatedFields), "*")
                .where("id", id)
                .andWhere("user_id", userId);
            return ProgrammedExerciseMapper.toQL(updatedEntities[0]);
        } catch (error) {
            logError(error, "Edit Programmed Exercise Failed");
            throw error;
        }
    }

    async findAllWithWorkoutId(userId: string, programmedWorkoutId: string) {
        return this.filteredAndSorted(userId, { programmedWorkout: programmedWorkoutId });
    }
}

export type ProgrammedExerciseEditableFields = { order?: number | null };
