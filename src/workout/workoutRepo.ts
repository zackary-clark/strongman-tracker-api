import { SQLDataSource } from "datasource-sql";
import { Knex } from "knex";
import { AddWorkoutInput, Workout } from "../../generated/schema";
import { logError } from "../utils";
import Transaction = Knex.Transaction;

const WORKOUT = "workout";
const LIFT = "lift";

export class WorkoutRepo extends SQLDataSource {
    public findAllWorkouts(): Workout[] {
        return this.knex.select("*").from(WORKOUT);
    }

    public findOneWorkout(id: number): Workout {
        return this.knex.select("*").where("id", id).from(WORKOUT).first();
    }

    public async addWorkout(workout: AddWorkoutInput): Promise<Workout> {
        try {
            const insertedWorkoutArray = await this.knex.into(WORKOUT).insert({...workout}, "*");
            return insertedWorkoutArray[0];
        } catch (error) {
            logError(error, "Add Workout Failed");
            throw error;
        }
    }

    public async deleteWorkoutAndAssociatedLifts(id: number): Promise<boolean> {
        try {
            await this.knex.transaction(async (trx: Transaction) => {
                await trx(LIFT).where("workout", id).del();
                await trx(WORKOUT).where("id", id).del();
            });
            return true;
        } catch (error) {
            logError(error, "Delete Workout (and associated lifts) Failed");
            return false;
        }
    }
}
