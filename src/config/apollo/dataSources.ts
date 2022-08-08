import { ExerciseRepo } from "../../exercise/exerciseRepo";
import { ProgramRepo } from "../../program/programRepo";
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
    programRepo: ProgramRepo;
};

const maxRepo = new MaxRepo(knexConfig);
const workoutRepo = new WorkoutRepo(knexConfig);
const liftRepo = new LiftRepo(knexConfig);
const userPreferencesRepo = new UserPreferencesRepo(knexConfig);
const exerciseRepo = new ExerciseRepo(knexConfig);
const programRepo = new ProgramRepo(knexConfig);

export const dataSources = (): Sources => ({
    maxRepo,
    workoutRepo,
    liftRepo,
    userPreferencesRepo,
    exerciseRepo,
    programRepo,
});
