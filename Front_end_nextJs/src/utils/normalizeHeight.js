/**
 * Convertit un nombre en centimètre en mètre et le formate pour
 * avoir cette forme exemple : 1m65
 * @param {number} number - Le nombre en centimètre.
 * @returns {string} La chaîne de caractères formater.
 */
export function normalizeHeight(number) {
    const numberMeter = number / 100;
    return numberMeter.toFixed(2).replace(".", "m");
}
