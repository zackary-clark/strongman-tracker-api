import { ExerciseRepo } from "../../exercise/ExerciseRepo";
import { ProgramRepo } from "../../program/ProgramRepo";
import { ProgrammedWorkoutRepo } from "../../programmedWorkout/ProgrammedWorkoutRepo";
import { UserPreferencesRepo } from "../../userPreferences/UserPreferencesRepo";
import knexConfig from "../knexConfig";
import { LiftRepo } from "../../lift/LiftRepo";
import { MaxRepo } from "../../max/MaxRepo";
import { WorkoutRepo } from "../../workout/WorkoutRepo";

export type Sources = {
    maxRepo: MaxRepo;
    workoutRepo: WorkoutRepo;
    liftRepo: LiftRepo;
    userPreferencesRepo: UserPreferencesRepo;
    exerciseRepo: ExerciseRepo;
    programRepo: ProgramRepo;
    programmedWorkoutRepo: ProgrammedWorkoutRepo;
};

const maxRepo = new MaxRepo(knexConfig);
const workoutRepo = new WorkoutRepo(knexConfig);
const liftRepo = new LiftRepo(knexConfig);
const userPreferencesRepo = new UserPreferencesRepo(knexConfig);
const exerciseRepo = new ExerciseRepo(knexConfig);
const programRepo = new ProgramRepo(knexConfig);
const programmedWorkoutRepo = new ProgrammedWorkoutRepo(knexConfig);

export const dataSources = (): Sources => ({
    maxRepo,
    workoutRepo,
    liftRepo,
    userPreferencesRepo,
    exerciseRepo,
    programRepo,
    programmedWorkoutRepo,
});
