export interface Max {
    id: number;
    date: Date;
    squat1RM?: number;
    bench1RM?: number;
    deadlift1RM?: number;
    press1RM?: number;
}

export type CreateMaxInput = Omit<Max, "id">;
