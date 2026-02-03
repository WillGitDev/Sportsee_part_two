"use client";
import { useState, useEffect } from "react";
import { logout } from "@/cookies/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useUserActivity(url, token, startWeek, endWeek) {
    const [dataUserActivity, setDataUserActivity] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!url || !token || !startWeek || !endWeek) {
            console.warn(
                "Données manquantes pour la récupération des données d'activitées",
            );
            return;
        }

        async function getUserActivity() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}${url}?startWeek=${startWeek}&endWeek=${endWeek}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.status === 403) {
                    logout();
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data = await response.json();
                setDataUserActivity(data);
            } catch (error) {
                setIsError(true);
                console.error(
                    "Erreur lors de la récupération des données d'activitées",
                    error,
                );
            } finally {
                setIsLoading(false);
            }
        }
        getUserActivity();
    }, [url, token, startWeek, endWeek]);
    return { isLoading, isError, dataUserActivity };
}
