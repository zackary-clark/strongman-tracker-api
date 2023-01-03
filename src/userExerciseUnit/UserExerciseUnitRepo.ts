import { SQLDataSource } from "datasource-sql";
import { LengthUnit, UserExerciseUnit, WeightUnit } from "../../generated/schema";
import { logError } from "../utils/logs";

const TABLE = "user_exercise_unit";

interface UserExerciseUnitEntity {
    id: string,
    user_id: string,
    exercise: string,
    weight_unit?: WeightUnit,
    length_unit?: LengthUnit,
}

export class UserExerciseUnitRepo extends SQLDataSource {
    public async find(userId: string, exerciseId: string): Promise<UserExerciseUnitEntity | null> {
        try {
            const userExerciseUnit = await this.findEntity(userId, exerciseId);
            return userExerciseUnit ?
                userExerciseUnit :
                null;
        } catch (e) {
            logError(e, "Error in UserExerciseUnitRepo.find");
            throw e;
        }
    }

    public async upsert(userId: string, newUnits: Partial<Omit<UserExerciseUnit, "id">>): Promise<UserExerciseUnitEntity> {
        try {
            if (!newUnits.exercise) throw new Error("Need exercise id to upsert UserExerciseUnit");
            const existing = await this.findEntity(userId, newUnits.exercise);
            let userExerciseUnits;
            if (existing) {
                userExerciseUnits = await this.knex(TABLE)
                    .where({
                        id: existing.id,
                        user_id: userId,
                        exercise: newUnits.exercise,
                    })
                    .update({
                        length_unit: newUnits.lengthUnit,
                        weight_unit: newUnits.weightUnit,
                    }, "*");
            } else {
                userExerciseUnits = await this.knex(TABLE)
                    .insert({
                        user_id: userId,
                        exercise: newUnits.exercise,
                        length_unit: newUnits.lengthUnit,
                        weight_unit: newUnits.weightUnit,
                    }, "*");
            }
            return userExerciseUnits[0];
        } catch (e) {
            logError(e, "Error in UserExerciseUnitRepo.upsert");
            throw e;
        }
    }

    private async findEntity(userId: string, exerciseId: string): Promise<UserExerciseUnitEntity | null> {
        return this.knex
            .first("*").from<UserExerciseUnitEntity>(TABLE)
            .where("user_id", userId)
            .andWhere("exercise", exerciseId);
    }
}
