"use client";
import useFetch from "@/hooks/useUserInfo";
import Cookies from "js-cookie";
import userInfoMapper from "@/services/mappers/userInfoMapper";

export default function TestAPI() {
    const token = Cookies.get("auth_token");
    const { data, isLoading, isError } = useFetch("/api/user-info", token);

    // Étape 1 : Voir si on passe le chargement
    if (isLoading)
        return <h1 style={{ color: "orange" }}>⏳ Chargement en cours...</h1>;

    // Étape 2 : Voir si on a une erreur
    if (isError) return <h1 style={{ color: "red" }}>❌ Erreur API</h1>;

    const dataMapper = userInfoMapper(data);
    console.log(dataMapper);
    //console.log("Structure reçue : ", Object.keys(data));
    // Étape 3 : Afficher les données BRUTES pour être sûr à 100%
    return (
        <div
            style={{
                background: "#f0f0f0",
                padding: "20px",
                color: "black",
                zIndex: 9999,
            }}
        >
            <h1 style={{ color: "green" }}>✅ RÉPONSE API DÉTECTÉE</h1>
            <p>Contenu total de la variable "data" :</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
