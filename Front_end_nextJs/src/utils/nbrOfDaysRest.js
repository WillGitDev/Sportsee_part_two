import { min, max, differenceInDays } from "date-fns";
/**
 * Fonction pour avoir le nombre de jour de repos.
 * @param {string[]} tabOfRests - Le tableau d'activité contenant
 * les dates de jours de sport effectué par l'utilsateur.
 * @returns {number} Le nombre de jours de repos.
 */
export default function nbrOfDaysRest(tabOfRests) {
    if (!tabOfRests) return;

    const activeDaysSet = new Set(
        tabOfRests.map((element) => {
            return new Date(element.date).getTime();
        }),
    );

    const firstDay = min(activeDaysSet);
    const lastDay = max(activeDaysSet);

    // On rajoute +1 pour pour compter le jour de début et de fin.
    const totalDays = differenceInDays(lastDay, firstDay) + 1;

    return totalDays - activeDaysSet.size;
}
