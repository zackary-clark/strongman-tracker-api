import { SQLDataSource } from "datasource-sql";
import { Knex } from "knex";
import { AddWorkoutInput, Workout } from "../../generated/schema";
import { logError } from "../utils/logs";
import Transaction = Knex.Transaction;

const WORKOUT = "workout";
const LIFT = "lift";

export class WorkoutRepo extends SQLDataSource {
    public findAllWorkouts(userId: string): Workout[] {
        return this.knex.select("*").where("user_id", userId).from(WORKOUT);
    }

    public findOneWorkout(id: string, userId: string): Workout {
        return this.knex.select("*").where("id", id).andWhere("user_id", userId).from(WORKOUT).first();
    }

    public async addWorkout(workout: AddWorkoutInput, userId: string): Promise<Workout> {
        try {
            const insertedWorkoutArray = await this.knex.into(WORKOUT).insert({...workout, ["user_id"]: userId}, "*");
            return insertedWorkoutArray[0];
        } catch (error) {
            logError(error, "Add Workout Failed");
            throw error;
        }
    }

    public async deleteWorkoutAndAssociatedLifts(id: string, userId: string): Promise<boolean> {
        try {
            await this.knex.transaction(async (trx: Transaction) => {
                await trx(LIFT).where("workout", id).andWhere("user_id", userId).del();
                await trx(WORKOUT).where("id", id).andWhere("user_id", userId).del();
            });
            return true;
        } catch (error) {
            logError(error, "Delete Workout (and associated lifts) Failed");
            return false;
        }
    }
}
