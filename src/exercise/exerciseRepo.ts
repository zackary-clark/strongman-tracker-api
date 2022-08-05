import { SQLDataSource } from "datasource-sql";
import { AddExerciseInput, Exercise, MuscleGroup, Sort } from "../../generated/schema";
import { logError } from "../utils/logs";
import ExerciseMapper from "./exerciseMapper";

const TABLE = "exercise";

export class ExerciseRepo extends SQLDataSource {
    public async index(userId: string): Promise<Exercise[]> {
        const exerciseEntities = await this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .orWhere("custom", false)
            .orderBy("name", Sort.Asc);
        return exerciseEntities.map(ExerciseMapper.toQL);
    }

    public async filteredAndSorted(userId: string, nameSort: Sort, focusGroup: MuscleGroup | null, custom: boolean | null): Promise<Exercise[]> {
        const exerciseEntities = await this.knex
            .select("*").from(TABLE)
            .modify((queryBuilder) => {
                if (focusGroup !== null) {
                    queryBuilder.whereRaw("? = ANY(focus_groups)", focusGroup);
                }
                if (custom === true) {
                    queryBuilder.where("custom", true);
                    queryBuilder.andWhere("user_id", userId);
                }
                if (custom === false) {
                    queryBuilder.where("custom", false);
                }
                if (custom === null) {
                    queryBuilder.where("custom", false);
                    queryBuilder.orWhere("user_id", userId);
                }
            })
            .orderBy("name", nameSort);
        return exerciseEntities.map(ExerciseMapper.toQL);
    }

    public async findOneExercise(userId: string, id: string): Promise<Exercise> {
        return ExerciseMapper.toQL(
            await this.knex
                .select("*").from(TABLE)
                .where("id", id)
                .andWhereRaw("custom = false OR user_id = ?", userId)
                .first()
        );
    }

    public async createCustomExercise(userId: string, input: AddExerciseInput): Promise<Exercise> {
        try {
            const insertedEntities = await this.knex.into(TABLE).insert(ExerciseMapper.toEntity({...input}, userId), "*");
            return ExerciseMapper.toQL(insertedEntities[0]);
        } catch (error) {
            logError(error, "Add Exercise Failed");
            throw error;
        }
    }

    public async editExercise(userId: string, id: string, updatedField: Partial<Exercise>): Promise<Exercise> {
        try {
            const updatedEntities = await this.knex.from(TABLE)
                .update(ExerciseMapper.partialToEntity(updatedField), "*")
                .where("id", id)
                .andWhere("user_id", userId);
            return ExerciseMapper.toQL(updatedEntities[0]);
        } catch (error) {
            logError(error, "Edit Exercise Failed");
            throw error;
        }
    }
}
