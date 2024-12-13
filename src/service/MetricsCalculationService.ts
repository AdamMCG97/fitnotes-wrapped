import { BindParams, Database } from "sql.js";
import { MuscleGroup, WrappedMetrics } from "../domain/WrappedMetrics";

export function calculateMetrics(database: Database): WrappedMetrics {
    const daysWorkingOutCy = getTotalDaysWorkingOut(database, "2024")
    return {
        daysWorkingOut: daysWorkingOutCy,
        daysWorkingOutChangeFromPy: daysWorkingOutCy - getTotalDaysWorkingOut(database, "2023"),
        mostWorkedMuscleGroupByDays: getMostWorkedMuscleGroupByDays(database),
        mostWorkedMuscleGroupBySets: getMostWorkedMuscleGroupBySets(database),
        mostWorkedMuscleGroupByReps: getMostWorkedMuscleGroupByReps(database),
        mostSetsByExercise: getMostSetsByExercise(database),
        mostRepsByExercise: getMostRepsByExercise(database),
        totalPrs: getTotalPrs(database),
        prsByMuscleGroup: getPrsByMuscleGroup(database),
        prsByExercise: getPrsByExercise(database),
        comments: getComments(database),
        cardioTime: getCardioMinutes(database)
    }
}

function paramsForYearFrom(isoFormatYear: string): BindParams {
    const startOfYear = new Date(Date.parse(isoFormatYear + "-01-01"));
    const startOfNextYear = new Date(startOfYear);
    startOfNextYear.setFullYear(startOfYear.getFullYear() + 1)
    return { $maxDate: startOfNextYear.toISOString().split("T")[0], $minDate: startOfYear.toISOString().split("T")[0] }
}

function getTotalDaysWorkingOut(database: Database, isoFormatYear: string): number {
    const statement = database.prepare("SELECT count(distinct date) as count FROM 'training_log' where date between date($minDate) and date($maxDate)")
    const params = paramsForYearFrom(isoFormatYear);
    statement.bind(params);
    while (statement.step()) {
        const row = statement.getAsObject()
        return row['count'] as number
    }
    return 0;
}

function getMostWorkedMuscleGroupByDays(database: Database): {
    muscleGroup: MuscleGroup;
    days: number
}[] {
    const statement = database.prepare(`with exercise_by_day as (
select exercise_id, date 
from training_log 
where date between date($minDate) and date($maxDate)
group by exercise_id, date
),
categories_by_day as (
select distinct category.name, ebd.date as date 
from exercise_by_day ebd
left join exercise on ebd.exercise_id = exercise._id
left join category on exercise.category_id = category._id
order by date desc)
select count(date) as count, name as name
from categories_by_day
group by name
order by count desc`)
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ muscleGroup: row["name"] as MuscleGroup, days: row["count"] as number })
    }
    return results;
}

function getMostWorkedMuscleGroupBySets(database: Database): {
    muscleGroup: MuscleGroup;
    sets: number
}[] {
    const sql = `
with set_count as (
    select exercise_id, count(exercise_id) as count
    from training_log 
    where date between date($minDate) and date($maxDate)
    group by exercise_id
),
categories_by_set as (
    select category.name, sc.count, exercise.name
    from set_count sc
    left join exercise on sc.exercise_id = exercise._id
    left join category on exercise.category_id = category._id
    order by count desc
)
select name, sum(count) as count 
from categories_by_set
group by name
order by count desc`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ muscleGroup: row["name"] as MuscleGroup, sets: row["count"] as number })
    }
    return results;
}

function getMostWorkedMuscleGroupByReps(database: Database): {
    muscleGroup: MuscleGroup;
    reps: number
}[] {
    const sql = `
with rep_count as (
    select exercise_id, sum(reps) as count
    from training_log 
    where date between date($minDate) and date($maxDate)
    group by exercise_id
),
categories_by_reps as (
    select category.name, rc.count, exercise.name
    from rep_count rc
    left join exercise on rc.exercise_id = exercise._id
    left join category on exercise.category_id = category._id
    order by count desc
)
select name, sum(count) as count 
from categories_by_reps
group by name
order by count desc`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ muscleGroup: row["name"] as MuscleGroup, reps: row["count"] as number })
    }
    return results;
}

function getMostSetsByExercise(database: Database): {
    exercise: string;
    sets: number;
}[] {
    const sql = `
with set_count as (
    select exercise_id, count(exercise_id) as count
    from training_log 
    where date between date($minDate) and date($maxDate)
    group by exercise_id
),
exercises_by_set as (
    select sc.count, exercise.name
    from set_count sc
    left join exercise on sc.exercise_id = exercise._id
    order by count desc
)
select * from exercises_by_set`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ exercise: row["name"] as string, sets: row["count"] as number })
    }
    return results;
}

function getMostRepsByExercise(database: Database): {
    exercise: string;
    reps: number;
}[] {
    const sql = `
with rep_count as (
    select exercise_id, sum(reps) as count
    from training_log 
    where date between date($minDate) and date($maxDate)
    group by exercise_id
),
exercises_by_reps as (
    select rc.count, exercise.name
    from rep_count rc
    left join exercise on rc.exercise_id = exercise._id
    order by count desc
)
select * from exercises_by_reps`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ exercise: row["name"] as string, reps: row["count"] as number })
    }
    return results;
}

function getTotalPrs(database: Database): number {
    const sql = `
select count(is_personal_record) as count
from training_log 
where date between date($minDate) and date($maxDate)
and is_personal_record > 0
group by is_personal_record`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    while (statement.step()) {
        const row = statement.getAsObject()
        return row["count"] as number;
    }
    return 0
}

function getPrsByMuscleGroup(database: Database): {
    prs: number;
    muscleGroup: MuscleGroup;
}[] {
    const sql = `
with pr_count as (
    select count(is_personal_record) as count, exercise_id
    from training_log 
    where date between date($minDate) and date($maxDate)
    and is_personal_record > 0
    group by is_personal_record, exercise_id
),
prs_by_exercise as (
    select category.name, pc.count
    from pr_count pc
    left join exercise on pc.exercise_id = exercise._id
	left join category on exercise.category_id = category._id
    order by count desc
)
select sum(count) as count, name
from prs_by_exercise
group by name
order by count desc`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ muscleGroup: row["name"] as MuscleGroup, prs: row["count"] as number })
    }
    return results;
}


function getPrsByExercise(database: Database): {
    prs: number;
    exercise: string;
}[] {
    const sql = `
with pr_count as (
    select count(is_personal_record) as count, exercise_id
    from training_log 
    where date between date($minDate) and date($maxDate)
    and is_personal_record > 0
    group by is_personal_record, exercise_id
),
prs_by_exercise as (
    select pc.count, exercise.name
    from pr_count pc
    left join exercise on pc.exercise_id = exercise._id
    order by count desc
)
select * from prs_by_exercise`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push({ exercise: row["name"] as string, prs: row["count"] as number })
    }
    return results;
}

function getComments(database: Database): string[] {
    const sql = `
select comment
from comment 
where date between date($minDate) and date($maxDate)`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    const results = []
    while (statement.step()) {
        const row = statement.getAsObject()
        results.push(row["comment"] as string)
    }
    return results
}

function getCardioMinutes(database: Database): number {
    const sql = `
with cardio_id as (
	select _id 
	from category
	where name = 'Cardio'
), cardio_exercises as (
	select _id
	from exercise
	where category_id in (select * from cardio_id)
)
select sum(duration_seconds) as total_seconds
from training_log 
where date between date($minDate) and date($maxDate)
and exercise_id in (select * from cardio_exercises)`
    const statement = database.prepare(sql);
    const params = paramsForYearFrom("2024");
    statement.bind(params);
    while (statement.step()) {
        const row = statement.getAsObject()
        return Math.round((row["total_seconds"] as number) / 60);
    }
    return 0
}