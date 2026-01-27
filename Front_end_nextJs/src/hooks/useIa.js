"use client";

import { useState, useContext } from "react";
import { userContext } from "@/contexts/UserContext";
import userSendIaInfo from "@/services/mappers/userSendIaInfoMapper";

const API_URL = process.env.NEXT_PUBLIC_API_CHAT;

export default function useIa() {
    const { userData } = useContext(userContext);
    const userInfoIa = userSendIaInfo(userData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    async function fetchIa(prompt, messages) {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt,
                    userInfoStats: userInfoIa,
                    lastMessages: messages,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();

                switch (response.status) {
                    case 401:
                        setIsError(true);
                        setError(errorData);
                        break;
                    case 429:
                        setIsError(true);
                        setError(errorData.error);
                        break;
                    case 500:
                        setIsError(true);
                        setError(response.error);
                        break;
                    default:
                        setIsError(true);
                        setError("Une erreur inattendue c'est produite");
                }
                return errorData;
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Erreur: ", error.message);
            setIsError(true);
            setError("Impossible d'accèder aux serveurs");
            return null;
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, isError, error, fetchIa };
}
