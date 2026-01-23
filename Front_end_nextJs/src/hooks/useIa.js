"use client";

import { useState, useContext } from "react";
import { userContext } from "@/contexts/UserContext";
import userSendIaInfo from "@/services/mappers/userSendIaInfoMapper";

const API_URL = process.env.NEXT_PUBLIC_API_CHAT;

export default function useIa() {
    const { userData } = useContext(userContext);
    const userInfoIa = userSendIaInfo(userData);
    const [isLoading, setIsLoading] = useState(null);
    const [isError, setIsError] = useState(null);

    async function fetchIa(prompt, messages) {
        setIsLoading(true);
        setIsError(false);
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
                console.error("Erreur API : ", errorData);
                throw new Error(`Erreur API : ${response.status}`);
            }

            const data = await response.json();
            if (!data.choices[0].message.content) {
                console.error("Data du useIa est null");
                return;
            }
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Erreur: ", error.message);
            setIsError(true);
            return null;
        } finally {
            setIsLoading(false);
        }
    }
    return { isLoading, isError, fetchIa };
}
