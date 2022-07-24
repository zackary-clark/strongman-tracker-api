import { UserPreferences, WeightUnit } from "../../generated/schema";

export interface UserPreferencesEntity {
    id: string,
    weight_unit: WeightUnit
}

const toEntity = (ql: UserPreferences, userId: string): UserPreferencesEntity => ({
    id: userId,
    weight_unit: ql.weightUnit
});

const toQL = (entity: UserPreferencesEntity): UserPreferences => ({
    weightUnit: entity.weight_unit
});

export default {
    toEntity,
    toQL
};
