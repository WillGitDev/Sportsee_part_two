/**
 * Transforme un tableau de donnée par semaine en un tableau
 * qui regroupe les éléments par quatre semaines.
 * @param {Object[]} data - Un tableau segmenter par semaine.
 * @return {Object[]} Un tableau segmenter en quatre semaines.
 */
export default function splitFourWeeks(data) {
    const tab = [];
    for (let i = 0; i < data.length; i += 4) {
        const t = data.slice(i, i + 4);
        tab.push(t);
    }
    return tab;
}
