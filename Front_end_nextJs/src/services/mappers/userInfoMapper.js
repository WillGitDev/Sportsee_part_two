import normalizeData from "@/utils/normalizeData";
import { normalizeHeight } from "@/utils/normalizeHeight";
import normalizeGender from "@/utils/normalizeGender";
/**
 * Mappe les informations personnel de l'utilsateur.
 * @param {Object[]} data - Les informations de l'utilisateur.
 * @returns {Object} Les données normalisé.
 */
export default function userInfoMapper(apiUserInfo) {
    if (!apiUserInfo || !apiUserInfo.profile || !apiUserInfo.statistics) return;
    return {
        firstName: apiUserInfo.profile.firstName,
        lastName: apiUserInfo.profile.lastName,
        createdAt: normalizeData(apiUserInfo.profile.createdAt),
        age: apiUserInfo.profile.age,
        gender: normalizeGender(apiUserInfo.profile.gender),
        weight: apiUserInfo.profile.weight,
        height: normalizeHeight(apiUserInfo.profile.height),
        profilePicture: apiUserInfo.profile.profilePicture,
        totalDistance: Math.round(apiUserInfo.statistics.totalDistance),
        totalSessions: apiUserInfo.statistics.totalSessions,
        totalDuration: apiUserInfo.statistics.totalDuration,
    };
}
