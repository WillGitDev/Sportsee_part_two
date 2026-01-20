"use client";

import { useState } from "react";
import { setCookie } from "@/cookies/auth";
import { useRouter } from "next/navigation";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function useAuth() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const [isAuthorized, setisAuthorized] = useState(false);

    async function login(url, name, password) {
        setIsLoading(true);
        setisAuthorized(false);
        setIsError(false);
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: name,
                    password: password,
                }),
            });
            if (!response.ok) {
                if (response.status === 401) {
                    setisAuthorized(true);
                    throw new Error(
                        "Le mot de passe/identifiant est incorrect",
                    );
                }
                throw new Error("Une erreur s'est produite");
            }

            const data = await response.json();
            setUserId(data.userId);
            setToken(data.token);
            setCookie(data.token, data.userId);
            router.push("/dashboard");
        } catch (error) {
            console.error("Erreur api : ", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return { login, userId, token, isLoading, isError, isAuthorized };
}
