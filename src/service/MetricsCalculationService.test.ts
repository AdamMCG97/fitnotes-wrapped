import { WrappedMetrics } from "../domain/WrappedMetrics";

const stubData: WrappedMetrics = {
    daysWorkingOut: 125,
    daysWorkingOutChangeFromPy: 25,
    mostWorkedMuscleGroupByDays: [
        {
            muscleGroup: 'Biceps',
            days: 100
        },
        {
            muscleGroup: 'Legs',
            days: 72
        },
        {
            muscleGroup: 'Triceps',
            days: 65
        }
    ],
    mostWorkedMuscleGroupBySets: [
        {
            muscleGroup: 'Biceps',
            sets: 250
        },
        {
            muscleGroup: 'Chest',
            sets: 150
        },
        {
            muscleGroup: 'Legs',
            sets: 125
        }
    ],
    mostWorkedMuscleGroupByReps: [
        {
            muscleGroup: 'Biceps',
            reps: 250
        },
        {
            muscleGroup: 'Chest',
            reps: 150
        },
        {
            muscleGroup: 'Legs',
            reps: 125
        }
    ],
    mostSetsByExercise: [
        {
            exercise: 'Flat Dumbbell Bench Press',
            sets: 200
        },
        {
            exercise: 'Barbell Squat',
            sets: 120
        },
        {
            exercise: 'Incline Dumbbell Bench Press',
            sets: 100
        }
    ],
    mostRepsByExercise: [
        {
            exercise: 'Flat Dumbbell Bench Press',
            reps: 200
        },
        {
            exercise: 'Barbell Squat',
            reps: 120
        },
        {
            exercise: 'Incline Dumbbell Bench Press',
            reps: 100
        }
    ],
    totalPrs: 70,
    prsByMuscleGroup: [
        {
            prs: 30,
            muscleGroup: 'Chest'
        },
        {
            prs: 12,
            muscleGroup: 'Legs'
        },
        {
            prs: 5,
            muscleGroup: 'Biceps'
        }
    ],
    prsByExercise: [
        {
            prs: 30,
            exercise: 'Flat Dumbbell Bench Press',
        },
        {
            prs: 12,
            exercise: 'Barbell Squat',
        },
        {
            prs: 5,
            exercise: 'Incline Dumbbell Bench Press',
        }
    ],
    comments: ['rpe 7, rpe 9, rp at 6, injured, tired'],
    cardioTime: 0
};