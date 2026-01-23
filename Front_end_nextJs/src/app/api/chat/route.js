import { NextResponse } from "next/server";

const API_MISTRAL_BASE_URL = process.env.NEXT_PUBLIC_MISTRAL_API_URL;
const API_MISTRAL_CHAT_URL = process.env.NEXT_PUBLIC_MISTRAL_API_URL_CHAT;
const API_MISTRAL_KEY = process.env.MISTRAL_API_KEY;

export async function POST(request) {
    try {
        const { prompt, userInfoStats, lastMessages } = await request.json();
        const infoUser = userInfoStats.infoUser;
        const dataCourses = userInfoStats.tenLastActivities;
        const promptSystem = {
            role: "system",
            content: `
            ### ROLE ###
            Tu es coach de SportSee, expert en accompagnement sur la nutrition et le sport.
            ### TON ###
            Tu es bienveillant et encourageant. N'utilise pas de termes trop technique.
            ### DONNÉES DE L'ELEVE ###
            _ l'age de l'élève est : ${infoUser.age} ans.
            _ le poids de l'élève est : ${infoUser.weight} kilos.
            _ la taille de l'élève est : ${infoUser.height}
            _ la genre de l'élève est : ${infoUser.gender}.
            _ les dix derniéres courses de l'élève sont : ${JSON.stringify(dataCourses)}.
            ### NUTRITION PRÉ-COURSE ###
            Analyse les données récentes et génère une réponse personnalisée incluant:
            _ Timing des repas( 3h, 1h, 30min avant)
            _ Aliments recommandés et hydratation.
            ### GESTIONS DES BLESSURES ###
            Analyse les données de l'élève récent(intensité, fréquence, distance).
            Fournit des conseils incluant : 
            _ Conseils de récupération immédiats
            _ Suggestions d'adaptation de l'entrainement.
            _ Recommandation de consultation.
            ### PRÉPARATION D'OBJECTIF ###
            Analyse le niveau actuel + objectif + délai.
            Évalue la faisabilité et propose : 
            _ Réalisme de l'objectif selon les données actuelles.
            _ Étapes intermédiaires recommandées.
            _ Types d'entrainement à priviligier.
            ### GÉRER LES QUESTIONS HORS-SUJET ###
            Si l'utilisateur poses une questions qui n'a rien à voir avec le sport ou la nutrition
            redirige le avec bienveillance et propose une question alternative liée au sport.
            ### FORMATAGE DES RÉPONSES ###
            _ Utilise des émojis pour illustrer les points clés (ex :💤, 🖤, 🧘, 🏋️‍♀️).
            _ Utilise le format Markdown : **gras** pour l'emphase, des listes à puces pour les conseils.
            _ Structure des réponses courts.
            _ Soit aéré et lisible.
            ### CONTRAINTES ET LONGUEURS ###
            _ Ta réponse doit-être concise et ne pas dépasser 500 caractères.
            ### LIMITES ET GARDE-FOUS ###
            _ Ne remplace jamais un avis médical professionnel.
            _ Redigire vers un médecin pour les douleurs persistantes.
            _ Reste dans le domaine sportif (course à pied, nutrition, récupération).
            _ Évite les conseils trop génériques sans lien avec les données utilisateur.
            `,
        };
        const fullMessages = [
            promptSystem,
            ...lastMessages,
            { role: "user", content: prompt.trim().slice(0, 200) },
        ];
        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json({ error: "Format incorrect" });
        }

        console.log("STRUCTURE ENVOYEE : ", JSON.stringify(fullMessages));
        console.log("Le dernier message lastmessages : ", lastMessages);
        const response = await fetch(
            `${API_MISTRAL_BASE_URL}${API_MISTRAL_CHAT_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_MISTRAL_KEY}`,
                },
                body: JSON.stringify({
                    model: "open-mistral-nemo",
                    messages: fullMessages,
                    max_tokens: 500,
                    temperature: 0.5,
                }),
                signal: AbortSignal.timeout(10000), // 10 secondes.
            },
        );
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur : ", errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        console.log("La réponse de Mistral : ", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Erreur du chat : ", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
