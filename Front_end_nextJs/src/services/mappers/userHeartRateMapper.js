/**
 * Mappe les données cardiaque de l'utilisateur.
 * @param {Object[]} data - Les données de l'utilisateur.
 * @returns {Object} Les données normalisées.
 */
export default function userHeartRateMapper(apiUserActivity) {
    return apiUserActivity.map((element) => {
        return {
            date: element.date,
            heartRateMin: element.heartRate.min,
            heartRateMax: element.heartRate.max,
            heartRateAverage: element.heartRate.average,
        };
    });
}
