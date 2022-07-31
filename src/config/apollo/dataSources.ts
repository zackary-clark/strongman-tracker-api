import { ExerciseRepo } from "../../exercise/exerciseRepo";
import { UserPreferencesRepo } from "../../userPreferences/userPreferencesRepo";
import knexConfig from "../knexConfig";
import { LiftRepo } from "../../lift/liftRepo";
import { MaxRepo } from "../../max/maxRepo";
import { WorkoutRepo } from "../../workout/workoutRepo";

export type Sources = {
    maxRepo: MaxRepo;
    workoutRepo: WorkoutRepo;
    liftRepo: LiftRepo;
    userPreferencesRepo: UserPreferencesRepo;
    exerciseRepo: ExerciseRepo;
};

const maxRepo = new MaxRepo(knexConfig);
const workoutRepo = new WorkoutRepo(knexConfig);
const liftRepo = new LiftRepo(knexConfig);
const userPreferencesRepo = new UserPreferencesRepo(knexConfig);
const exerciseRepo = new ExerciseRepo(knexConfig);

export const dataSources = (): Sources => ({
    maxRepo,
    workoutRepo,
    liftRepo,
    userPreferencesRepo,
    exerciseRepo,
});
