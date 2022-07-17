import { SQLDataSource } from "datasource-sql";
import { AddLiftInput, Lift } from "../../generated/schema";
import { logError } from "../utils/logs";

const LIFT = "lift";

export class LiftRepo extends SQLDataSource {
    public findAllLiftsWithWorkoutId(workoutId: number): Lift[] {
        return this.knex.select("*").where("workout", workoutId).from(LIFT);
    }

    public async addLift(lift: AddLiftInput): Promise<Lift> {
        try {
            const insertedLiftArray = await this.knex.into(LIFT).insert({...lift}, "*");
            return insertedLiftArray[0];
        } catch (error) {
            logError(error, "Add Lift Failed");
            throw error;
        }
    }

    public async deleteLift(id: number): Promise<boolean> {
        try {
            await this.knex.from(LIFT).where("id", id).del();
            return true;
        } catch (error) {
            logError(error, "Delete Lift Failed");
            return false;
        }
    }
}
