import knexConfig from "./knexConfig";
import { LiftRepo } from "./lift/liftRepo";
import { MaxRepo } from "./max/maxRepo";
import { WorkoutRepo } from "./workout/workoutRepo";

export type Context = {
    dataSources: Sources
};

export type Sources = {
    maxRepo: MaxRepo;
    workoutRepo: WorkoutRepo;
    liftRepo: LiftRepo;
};

const maxRepo = new MaxRepo(knexConfig);
const workoutRepo = new WorkoutRepo(knexConfig);
const liftRepo = new LiftRepo(knexConfig);

export const dataSources = (): Sources => ({maxRepo, workoutRepo, liftRepo});
