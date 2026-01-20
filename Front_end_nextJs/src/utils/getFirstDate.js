import { min, parseISO } from "date-fns";

/**
 * Récupérer le premier jour à partir d'un tableau d'activité.
 * @param {string[]} activities - Un tableau des activités.
 * @returns {number} Le premier jour dans le tableau.
 */
export default function getFirstDate(activities) {
    const dates = activities.map((activity) => {
        return parseISO(activity.date);
    });

    return min(dates);
}
