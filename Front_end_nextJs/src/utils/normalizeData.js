import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Normalise la date pour qu'elle correspond au format jour mois année.
 * @param {string} dateString - La date qui seras normaliser sous
 * la forme, exemple : 4 janvier 2025.
 * @returns {string} La date dans un format : jour, mois, année.
 */
export default function normalizeData(dateString) {
    const date = parseISO(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
}
