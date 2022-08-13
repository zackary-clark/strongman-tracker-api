import { SQLDataSource } from "datasource-sql";
import { AddLiftInput, Lift } from "../../generated/schema";
import { logError } from "../utils/logs";

const LIFT = "lift";

export class LiftRepo extends SQLDataSource {
    public async findAllLiftsWithWorkoutId(workoutId: string, userId: string): Promise<Lift[]> {
        return this.knex
            .select("*").from(LIFT)
            .where("workout", workoutId)
            .andWhere("user_id", userId);
    }

    public async addLift(lift: AddLiftInput, userId: string): Promise<Lift> {
        try {
            const insertedLiftArray = await this.knex.into(LIFT).insert({...lift, ["user_id"]: userId}, "*");
            return insertedLiftArray[0];
        } catch (error) {
            logError(error, "Add Lift Failed");
            throw error;
        }
    }

    public async deleteLift(id: string, userId: string): Promise<boolean> {
        try {
            await this.knex.from(LIFT).where("id", id).andWhere("user_id", userId).del();
            return true;
        } catch (error) {
            logError(error, "Delete Lift Failed");
            return false;
        }
    }
}
