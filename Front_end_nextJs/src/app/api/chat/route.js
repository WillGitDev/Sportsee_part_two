import { NextResponse } from "next/server";

const API_MISTRAL_BASE_URL = process.env.NEXT_PUBLIC_MISTRAL_API_URL;
const API_MISTRAL_CHAT_URL = process.env.NEXT_PUBLIC_MISTRAL_API_URL_CHAT;
const API_MISTRAL_KEY = process.env.MISTRAL_API_KEY;

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt || typeof prompt !== "string") {
            //throw new Error("Format incorrect");
            return NextResponse.json({ error: "Format incorrect" });
        }

        const cleanPrompt = prompt.trim().slice(0, 1000);

        const response = await fetch(
            `${API_MISTRAL_BASE_URL}${API_MISTRAL_CHAT_URL}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_MISTRAL_KEY}`,
                },
                body: JSON.stringify({
                    model: "mistral-tiny",
                    messages: [
                        {
                            role: "user",
                            content: cleanPrompt,
                        },
                    ],
                    max_tokens: 500,
                }),
                signal: AbortSignal.timeout(10000), // 5 secondes.
            },
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Erreur http");
        }

        const data = await response.json();
        console.log("La réponse de Mistral : ", data);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Erreur du chat : ", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
