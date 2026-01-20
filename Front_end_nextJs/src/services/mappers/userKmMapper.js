/**
 * Mappe les données de date et de kilomètre de l'utilisateur.
 * @param {Object[]} data - Les données utilisateurs
 * @returns {Object[]} Les données mapper
 */
export default function userKmMapper(apiUserActivity) {
    return apiUserActivity.map((element) => {
        return {
            date: element.date,
            km: element.distance,
        };
    });
}
