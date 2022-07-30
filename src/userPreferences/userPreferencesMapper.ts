import { LengthUnit, UserPreferences, WeightUnit } from "../../generated/schema";

export interface UserPreferencesEntity {
    id: string,
    weight_unit: WeightUnit,
    length_unit: LengthUnit,
}

const toEntity = (ql: UserPreferences, userId: string): UserPreferencesEntity => ({
    id: userId,
    weight_unit: ql.weightUnit,
    length_unit: ql.lengthUnit,
});

const toQL = (entity: UserPreferencesEntity): UserPreferences => ({
    weightUnit: entity.weight_unit,
    lengthUnit: entity.length_unit,
});

export default {
    toEntity,
    toQL
};
