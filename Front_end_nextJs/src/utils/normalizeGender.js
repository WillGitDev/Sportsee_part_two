export default function normalizeGender(gender) {
    if (gender === "female") return "Femme";
    else if (gender === "male") return "Homme";
    else return "Genre non renseigner";
}
