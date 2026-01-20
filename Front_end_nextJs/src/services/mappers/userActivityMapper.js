import nbrOfDaysRest from "@/utils/nbrOfDaysRest";
import getFirstDate from "@/utils/getFirstDate";

/**
 * Mappe les informations de l'utilisateur.
 * @param {Object[]} apiUserActivity - Les données de l'utilisateur.
 * @returns {Object} Retourne les activitées, le total de calorie
 * brulé, le nombre de jour de repos et la date de départ.
 */
export default function userActivityMapper(apiUserActivity) {
    if (!apiUserActivity) return;

    let totalCalBurn = 0;
    let totalDuration = 0;
    let activities = [];
    const daysRest = nbrOfDaysRest(apiUserActivity);
    const startWithDate = getFirstDate(apiUserActivity);
    const startWith = startWithDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    apiUserActivity.forEach((element) => {
        totalCalBurn += element.caloriesBurned;
        totalDuration += element.duration;

        activities.push({
            date: element.date,
            distance: element.distance,
            duration: element.duration,
            heartRate: {
                min: element.heartRate.min,
                max: element.heartRate.max,
                average: element.heartRate.average,
            },
            caloriesBurned: element.caloriesBurned,
        });
    });
    const hoursDuration = Math.floor(totalDuration / 60);
    const minutesDuration = totalDuration % 60;
    const totalDurationObj = { hoursDuration, minutesDuration };
    return { activities, totalCalBurn, daysRest, startWith, totalDurationObj };
}
