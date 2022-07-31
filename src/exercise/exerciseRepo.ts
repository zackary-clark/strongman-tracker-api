import { SQLDataSource } from "datasource-sql";
import { Exercise, MuscleGroup, Sort } from "../../generated/schema";
import ExerciseMapper from "./exerciseMapper";

const TABLE = "exercise";

export class ExerciseRepo extends SQLDataSource {
    public async index(): Promise<Exercise[]> {
        const exerciseEntities = await this.knex
            .select("*").from(TABLE)
            .orderBy("name", Sort.Asc);
        return exerciseEntities.map(ExerciseMapper.toQL);
    }

    public async filteredAndSorted(focusGroup: MuscleGroup, nameSort: Sort): Promise<Exercise[]> {
        const exerciseEntities = await this.knex
            .select("*").from(TABLE)
            .whereRaw("? = ANY(focus_groups)", focusGroup)
            .orderBy("name", nameSort);
        return exerciseEntities.map(ExerciseMapper.toQL);
    }

    public async findOneExercise(id: string): Promise<Exercise> {
        return ExerciseMapper.toQL(
            await this.knex
                .select("*").from(TABLE)
                .where("id", id)
                .first()
        );
    }
}
