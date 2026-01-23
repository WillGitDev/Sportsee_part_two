/**
 * Mappe les informations de l'utilisateur qui seras envoyées à l'IA pour obtenir
 * des conseils personnalisés.
 * @param {Object[]} userData - Les données de l'utilisateur(course, identitée).
 * @returns {Object} Les données mapper des informations de l'utilisateur et ses dix
 * dernières courses réalisées.
 */
export default function userSendIaInfo(userData) {
    if (!userData) return;

    const userInfo = userData.userInfo;
    const userActivity = userData.userActivity.activities;

    const tenLastActivities = userActivity.slice(-10);
    const infoUser = {
        age: userInfo.age,
        gender: userInfo.gender,
        height: userInfo.height,
        weight: userInfo.weight,
    };
    return { infoUser, tenLastActivities };
}
