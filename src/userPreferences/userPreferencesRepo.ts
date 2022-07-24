import { SQLDataSource } from "datasource-sql";
import { UserPreferences } from "../../generated/schema";
import { logError } from "../utils/logs";
import UserPreferencesMapper from "./userPreferencesMapper";

const TABLE = "user_preferences";

export class UserPreferencesRepo extends SQLDataSource {
    public async findOrCreate(userId: string): Promise<UserPreferences> {
        try {
            let existingPreferences = await this.knex.select("*").where("id", userId).from(TABLE);
            if (existingPreferences === undefined || existingPreferences.length < 1) {
                existingPreferences = await this.knex.insert({ id: userId }, "*").into(TABLE);
            }
            return UserPreferencesMapper.toQL(existingPreferences[0]);
        } catch (error) {
            logError(error, "FindOrCreate UserPreferences Failed");
            throw error;
        }
    }

    public async edit(userId: string, newPrefs: UserPreferences): Promise<UserPreferences> {
        const entity = UserPreferencesMapper.toEntity(newPrefs, userId);
        try {
            const savedPrefs = await this.knex.from(TABLE).where("id", userId).update(entity, Object.keys(entity));
            return UserPreferencesMapper.toQL(savedPrefs[0]);
        } catch (error) {
            logError(error, "Edit User Preferences Failed");
            throw error;
        }
    }
}
