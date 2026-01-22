"use client";

import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_CHAT;
export default function useIa() {
    const [isLoading, setIsLoading] = useState(null);
    const [isError, setIsError] = useState(null);
    async function fetchIa(prompt) {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: prompt,
                }),
            });

            if (!response.ok) throw new Error("Erreur réseau");

            const data = await response.json();

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
