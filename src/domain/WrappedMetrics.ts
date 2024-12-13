export interface WrappedMetrics {
    daysWorkingOut: number;
    daysWorkingOutChangeFromPy: number;
    mostWorkedMuscleGroupByDays: {
        muscleGroup: MuscleGroup;
        days: number
    }[],
    mostWorkedMuscleGroupBySets: {
        muscleGroup: MuscleGroup;
        sets: number
    }[],
    mostWorkedMuscleGroupByReps: {
        muscleGroup: MuscleGroup;
        reps: number
    }[],
    mostSetsByExercise: {
        exercise: string;
        sets: number;
    }[],
    mostRepsByExercise: {
        exercise: string;
        reps: number;
    }[],
    totalPrs: number,
    prsByMuscleGroup: {
        prs: number,
        muscleGroup: MuscleGroup
    }[],
    prsByExercise: {
        prs: number,
        exercise: string
    }[],
    comments: string[],
    cardioTime: number
}

export type MuscleGroup = 'Shoulders' | 'Triceps' | 'Biceps' | 'Chest' | 'Back' | 'Legs' | 'Abs' | 'Cardio'