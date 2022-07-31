import { Knex } from "knex";
import { Exercise, MuscleGroup } from "../generated/schema";

const exercises: Omit<Exercise, "id">[] = [
    {
        name: "Deadlift",
        focusGroups: [MuscleGroup.LowerBack, MuscleGroup.Hamstrings, MuscleGroup.Butt, MuscleGroup.Quads, MuscleGroup.UpperBack]
    },
    {
        name: "Squat",
        description: "Low Bar Barbell Squat, to at least competition depth.",
        focusGroups: [MuscleGroup.Quads, MuscleGroup.Butt, MuscleGroup.Hamstrings]
    },
    {
        name: "Press",
        description: "Standing strict barbell overhead press.",
        focusGroups: [MuscleGroup.Shoulders, MuscleGroup.Triceps]
    },
    {
        name: "Bench Press",
        description: "Barbell bench press, paused briefly on the chest, competition-style.",
        focusGroups: [MuscleGroup.Chest, MuscleGroup.Triceps]
    },
    {
        name: "Incline Bench Press",
        focusGroups: [MuscleGroup.Chest, MuscleGroup.Triceps, MuscleGroup.Shoulders]
    },
    {
        name: "Dumbbell Biceps Curl",
        focusGroups: [MuscleGroup.Biceps]
    },
    {
        name: "Dumbbell Bench Press",
        focusGroups: [MuscleGroup.Chest, MuscleGroup.Triceps]
    },
    {
        name: "Incline Dumbbell Bench Press",
        focusGroups: [MuscleGroup.Chest, MuscleGroup.Triceps, MuscleGroup.Shoulders]
    },
    {
        name: "Seated Dumbbell Shoulder Press",
        focusGroups: [MuscleGroup.Shoulders, MuscleGroup.Triceps]
    },
    {
        name: "EZ-Bar Biceps Curl",
        focusGroups: [MuscleGroup.Biceps]
    },
    {
        name: "Machine Biceps Curl",
        focusGroups: [MuscleGroup.Biceps]
    },
    {
        name: "High Bar Squat",
        focusGroups: [MuscleGroup.Quads, MuscleGroup.Butt, MuscleGroup.Hamstrings]
    },
    {
        name: "Lat Pulldown",
        focusGroups: [MuscleGroup.UpperBack]
    },
    {
        name: "Machine Fly",
        focusGroups: [MuscleGroup.Chest]
    },
    {
        name: "Pendlay Row",
        focusGroups: [MuscleGroup.UpperBack]
    },
    {
        name: "Pull-up",
        focusGroups: [MuscleGroup.UpperBack]
    },
    {
        name: "Chin-up",
        focusGroups: [MuscleGroup.UpperBack]
    },
    {
        name: "Tricep Push Down",
        focusGroups: [MuscleGroup.Triceps]
    },
    {
        name: "Scott Machine EZ-Bar Biceps Curl",
        focusGroups: [MuscleGroup.Biceps]
    },
    {
        name: "Dumbbell Shrugs",
        focusGroups: [MuscleGroup.Traps]
    }
];

const TABLE = "exercise";

export async function seed(knex: Knex): Promise<void> {
    const existingExercises = await knex.select("id").from(TABLE);
    if (existingExercises.length > 0) {
        return;
    }

    await knex(TABLE).insert(exercises.map(e => ({name: e.name, description: e.description, focus_groups: focusGroupArrayToString(e.focusGroups)})));
}

const focusGroupArrayToString = (groups: MuscleGroup[]): string | null => {
    if (!groups || groups.length < 1) {
        return null;
    } else {
        return "{" + groups.join(",") + "}";
    }
};
