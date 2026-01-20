import {
    eachWeekOfInterval,
    format,
    eachDayOfInterval,
    endOfISOWeek,
    min,
    max,
    parseISO,
    startOfToday,
} from "date-fns";

/**
 * Crée les semaines des activitées.
 * @param {Object[]} data - Un tableau contenant les activitées.
 * @param {Boolean} [isKm=false] - True pour les éléments non renseigner pour les kilomètres,
 * on spécifie un format de donnée.
 * @returns {Object[][]} Un tableau de semaines contenant des tableaux de jours.
 */
export default function dataByWeeks(data, isKm = false) {
    if (!data || data.length == 0) return [];

    const dates = data.map((activitie) => parseISO(activitie.date));

    // Un dictionnaire pour stocker chaque activité en fonction de sa date.
    const dataMap = new Map(
        data.map((activitie) => [activitie.date, activitie]),
    );
    const mondays = eachWeekOfInterval(
        {
            start: min(dates),
            end: startOfToday(),
        },
        { weekStartsOn: 1 },
    ); // Ici 1 c'est pour lundi.

    return mondays.map((monday) => {
        const daysInWeek = eachDayOfInterval({
            start: monday,
            end: endOfISOWeek(monday),
        });

        return daysInWeek.map((day) => {
            const dateString = format(day, "yyyy-MM-dd");
            if (!isKm) {
                return (
                    dataMap.get(dateString) || {
                        date: dateString,
                        isMissing: true,
                        heartRateAverage: 0,
                    }
                );
            } else {
                return (
                    dataMap.get(dateString) || {
                        date: dateString,
                        km: 0,
                    }
                );
            }
        });
    });
}
