import { LiaDumbbellSolid } from "react-icons/lia";
import { MuscleGroup, WrappedMetrics } from "../domain/WrappedMetrics";
import Card from "./Card";
import List from "./List";
import { SlSpeech } from "react-icons/sl";
import { FaPersonRunning } from "react-icons/fa6";

interface DisplayMetricsProps {
    metrics: WrappedMetrics
}

function getDisplayStringForChange(change: number): string {
    if (change > 0) {
        return `An increase of ${change} days compared to last year, way to go!`
    }
    if (change < 0) {
        return `A decrease of ${change * -1} days compared to last year.`
    }
    return "The exact same number of days you spent training last year too!"
}

function getSubheadingByMuscleGroup(muscleGroup: MuscleGroup): string {
    switch (muscleGroup) {
        case 'Shoulders':
            return 'Keep building those boulders';
        case 'Abs':
            return 'Abs of steel';
        case 'Chest':
            return 'Big chest'
        case 'Back':
            return 'Big back'
        case 'Legs':
            return 'No one can call you 🍗'
        case 'Biceps':
            return 'Keep building those guns'
        case 'Triceps':
            return 'Big triceps'
        case 'Cardio':
            return 'Who wants to make gains anyway?'
        default:
            return 'Oooh, a custom exercise category'
    }
}

function percentageOfTheYear(days: number): number {
    return Math.round((days / 365) * 100);
}

function commentAnalysis(comments: number): string {
    if (comments < 10) {
        return "You weren't very talkative this year"
    } else {
        return "You're a real chatterbox"
    }
}

function cardioAnalysis(cardioTime: number): string {
    if (cardioTime < 300) {
        return "Bulking is more fun anyway"
    } else {
        return "That was a sweaty year"
    }
}

const DisplayMetrics = (props: DisplayMetricsProps) => {
    const { metrics } = props;

    const muscleGroupBySetsItems = metrics.mostWorkedMuscleGroupBySets.map(item => {
        return {
            description: item.muscleGroup,
            statistic: `${item.sets} Sets`
        }
    });

    const muscleGroupByDaysItems = metrics.mostWorkedMuscleGroupByDays.map(item => {
        return {
            description: item.muscleGroup,
            statistic: `${item.days} Days`
        }
    });

    const muscleGroupByRepsItems = metrics.mostWorkedMuscleGroupByReps.map(item => {
        return {
            description: item.muscleGroup,
            statistic: `${item.reps} Reps`
        }
    });

    const mostSetsByExerciseItems = metrics.mostSetsByExercise.map(item => {
        return {
            description: item.exercise,
            statistic: `${item.sets} Sets`
        }
    });

    const mostRepsByExerciseItems = metrics.mostRepsByExercise.map(item => {
        return {
            description: item.exercise,
            statistic: `${item.reps} Reps`
        }
    });

    const prsByExerciseItems = metrics.prsByExercise.map(item => {
        return {
            description: item.exercise,
            statistic: `${item.prs} PRs`
        }
    });

    const prsByMuscleGroupItems = metrics.prsByMuscleGroup.map(item => {
        return {
            description: item.muscleGroup,
            statistic: `${item.prs} PRs`
        }
    });


    return (
        <div>
            <Card icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`Total Days Working Out: ${metrics.daysWorkingOut}`} subheading={`That's ${percentageOfTheYear(metrics.daysWorkingOut)}% of the year! \n ${getDisplayStringForChange(metrics.daysWorkingOutChangeFromPy)}`} />
            <Card icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`Most Worked Muscle Group`} subheading="Where have you been focusing your time and effort this year?" />
            <Card group={'Most Worked Muscle Group'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Days: ${metrics.mostWorkedMuscleGroupByDays[0].muscleGroup}`} subheading={getSubheadingByMuscleGroup(metrics.mostWorkedMuscleGroupByDays[0].muscleGroup)} list={<List items={muscleGroupByDaysItems} limit={5} />} />
            <Card group={'Most Worked Muscle Group'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Sets: ${metrics.mostWorkedMuscleGroupBySets[0].muscleGroup}`} subheading={getSubheadingByMuscleGroup(metrics.mostWorkedMuscleGroupBySets[0].muscleGroup)} list={<List items={muscleGroupBySetsItems} limit={5} />} />
            <Card group={'Most Worked Muscle Group'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Reps: ${metrics.mostWorkedMuscleGroupByReps[0].muscleGroup}`} subheading={getSubheadingByMuscleGroup(metrics.mostWorkedMuscleGroupByReps[0].muscleGroup)} list={<List items={muscleGroupByRepsItems} limit={5} />} />
            <Card icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`Most Frequent Exercise`} subheading="Which exercise have you been enjoying the most this year?" />
            <Card group={'Most Frequent Exercise'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Sets: ${metrics.mostSetsByExercise[0].exercise}`} subheading="You loved this one" list={<List items={mostSetsByExerciseItems} limit={5} />} />
            <Card group={'Most Frequent Exercise'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Reps: ${metrics.mostRepsByExercise[0].exercise}`} subheading="That's some serious volume" list={<List items={mostRepsByExerciseItems} limit={5} />} />
            <Card icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`Total PRs Set: ${metrics.totalPrs}`} subheading="Each one was hard earned" />
            <Card group={'Most PRs Set'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Muscle Group: ${metrics.prsByMuscleGroup[0].muscleGroup}`} subheading="You loved this one" list={<List items={prsByMuscleGroupItems} limit={5} />} />
            <Card group={'Most PRs Set'} icon={<LiaDumbbellSolid size={'7.5em'} />} headline={`By Exercise: ${metrics.prsByExercise[0].exercise}`} subheading="That's some serious volume" list={<List items={prsByExerciseItems} limit={5} />} />
            <Card icon={<SlSpeech size={'7.5em'} />} headline={`Total Comments: ${metrics.comments.length}`} subheading={commentAnalysis(metrics.comments.length)} />
            <Card icon={<FaPersonRunning size={'7.5em'} />} headline={`Total Cardio: ${metrics.cardioTime} minutes`} subheading={cardioAnalysis(metrics.cardioTime)} />
        </div>
    );
}

export default DisplayMetrics;