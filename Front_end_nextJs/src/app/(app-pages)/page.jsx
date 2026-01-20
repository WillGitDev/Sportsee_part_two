"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import ErrorBox from "@components/ErrorBox";
import { useContext } from "react";
import { userContext } from "@/contexts/UserContext";
import { getToken } from "@/cookies/auth";
import Icone from "@components/Icone";

export default function Home() {
    const { setToken } = useContext(userContext);
    const url = "/api/login";
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const { login, userId, token, isLoading, error, isAuthorized } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        // debugger;
        await login(url, mail, password);
        setToken(getToken());
    }

    console.log(userId, token, isLoading, error);
    return (
        <>
            {isAuthorized && (
                <ErrorBox
                    isError={isAuthorized}
                    text="Combinaisons mot de passe / identifiant invalide"
                />
            )}
            <main className={styles.main}>
                <div className={styles.contentContainer}>
                    <div className={styles.inputContainer}>
                        <div className={styles.logo}>
                            <h2 className={styles.textLogo}>
                                <Icone />
                                SPORTSEE
                            </h2>
                        </div>
                        <div className={styles.formContainer}>
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                            >
                                <h1 className={styles.title}>
                                    Transformez
                                    <br /> vos stats en résultats
                                </h1>
                                <p className={styles.connectionText}>
                                    Se connecter
                                </p>
                                <div>
                                    <label
                                        htmlFor="mail"
                                        className={styles.label}
                                    >
                                        Adresse mail
                                    </label>
                                    <input
                                        className={styles.inputText}
                                        type="mail"
                                        name="mail"
                                        id="mail"
                                        value={mail}
                                        onChange={(e) => {
                                            setMail(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className={styles.label}
                                    >
                                        Mot de passe
                                    </label>
                                    <input
                                        className={styles.inputText}
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`${styles.submit} buttonAnimate`}
                                >
                                    Se connecter
                                </button>
                                <p className={`${styles.textForgot}`}>
                                    Mot de passe oublié ?
                                </p>
                            </form>
                        </div>
                    </div>

                    <div className={styles.imgContainer}>
                        <Image
                            className={styles.img}
                            src="/images/background_picture.png"
                            width={800}
                            height={1024}
                            alt="Des coureurs de marathon qui court"
                        />
                        <div className={styles.info}>
                            <p>
                                Analysez vos performances en un clin d'oeil,
                                suivez vos progrès et atteignez vos objectifs.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

function handleSubmit(e, mail, password) {
    e.preventDefault();
    useAuth();
}
