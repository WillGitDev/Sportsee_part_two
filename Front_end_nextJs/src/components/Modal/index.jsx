"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./modal.module.css";
import { useContext } from "react";
import { modalContext } from "@/contexts/ModalContext";
import { userContext } from "@/contexts/UserContext";
import { faX, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import MessageChat from "@components/MessageChat";
import useIa from "@/hooks/useIa";
import LoadPoints from "@components/LoadPoints";
import ErrorBox from "@components/ErrorBox";
import messageMapper from "@/services/mappers/messageMapper";

export default function Modal() {
    const { userData } = useContext(userContext);
    const { isOpen, setIsOpen } = useContext(modalContext);
    const dialogRef = useRef(null);
    const [promptUser, setPromptUser] = useState("");
    const [messages, setMessages] = useState([]);

    const { fetchIa, isLoading, isError } = useIa();
    const logoIaOrange = "/icone/icone_ai_orange.png";
    const [messageError, setMessageError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    async function handleChat(e) {
        setMessageError("Une erreur inconnue s'est produite");
        e.preventDefault();
        if (!promptUser.trim() || isLoading) return;
        const messageUser = {
            role: "user",
            prompt: promptUser,
            image: userData.userInfo.profilePicture,
        };
        setMessages((prev) => [...prev, messageUser]);
        setPromptUser("");
        const responseAi = await fetchIa(promptUser, messageMapper(messages));

        if (responseAi && !responseAi.error && responseAi.choices?.length > 0) {
            const contentAi = {
                role: "assistant",
                prompt:
                    responseAi.choices[0].message?.content ??
                    "erreur inatendue",
                image: logoIaOrange,
            };
            setMessages((prev) => [...prev, contentAi]);
        } else {
            setMessageError(responseAi?.error);
            const errorText =
                responseAi?.error || "Une erreur innatendue est survenue";
            const contentAi = {
                role: "assistant",
                prompt: errorText,
                image: logoIaOrange,
            };
            setMessageError(errorText);

            setMessages((prev) => [...prev, contentAi]);
        }
    }

    function handleSend(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat(e);
        }
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={() => setIsOpen(false)}
            className={styles.dialog}
        >
            <div
                className={styles.modalBox}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                        className={styles.close}
                    >
                        Fermer <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className={styles.contentModalBox}>
                    <div className={styles.responseContainer}>
                        {isLoading && <LoadPoints />}
                        <ErrorBox isError={isError} text={messageError} />

                        {messages
                            .slice()
                            .reverse()
                            .map((message, index) => {
                                return (
                                    <MessageChat
                                        key={index}
                                        role={message.role}
                                        content={message.prompt}
                                        image={message.image}
                                    />
                                );
                            })}
                        <div className={styles.containerTitle}>
                            <h2 className={styles.title}>
                                Posez vos questions sur votre programme,
                                <br /> vos performances ou vos objectifs
                            </h2>
                        </div>
                    </div>
                    <div className={styles.containerChat}>
                        <form
                            className={styles.form}
                            onSubmit={(e) => handleChat(e)}
                        >
                            <label htmlFor="chatInput"></label>
                            <div className={styles.textAreaWrapper}>
                                <Image
                                    src="/icone/icone_ai_orange.png"
                                    alt="icone étoile"
                                    className={styles.iconeAiOrange}
                                    height={24}
                                    width={24}
                                />
                                <textarea
                                    placeholder="Comment puis-je vous aider ?"
                                    rows="1"
                                    cols="1"
                                    name="chatInput"
                                    id="chatInput"
                                    className={styles.chatInput}
                                    value={promptUser}
                                    onChange={(e) =>
                                        setPromptUser(e.currentTarget.value)
                                    }
                                    onKeyDown={handleSend}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={!promptUser.trim() || isLoading}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={styles.arrowUp}
                                />
                            </button>
                        </form>
                    </div>
                    <div className={styles.containerSuggestions}>
                        <button
                            className={styles.suggestion}
                            onClick={() =>
                                setPromptUser(
                                    "Comment améliorer mon endurance ?",
                                )
                            }
                        >
                            Comment améliorer mon endurance ?
                        </button>
                        <button
                            className={styles.suggestion}
                            onClick={() =>
                                setPromptUser(
                                    "Que signifie mon score de récupération ?",
                                )
                            }
                        >
                            Que signifie mon score de récupération ?
                        </button>
                        <button
                            className={styles.suggestion}
                            onClick={() =>
                                setPromptUser(
                                    "Peux-tu m'expliquer mon dernier graphique ?",
                                )
                            }
                        >
                            Peux-tu m'expliquer mon dernier graphique ?
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}
