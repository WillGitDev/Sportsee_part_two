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

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    async function handleChat(e) {
        e.preventDefault();
        if (!promptUser.trim() || isLoading) return;
        const messageUser = {
            role: "user",
            prompt: promptUser,
            image: userData.userInfo.profilePicture,
        };
        setMessages((prev) => [...prev, messageUser]);
        console.log("le message mapper est : ", messageMapper(messages));
        const responseAi = await fetchIa(promptUser, messageMapper(messages));
        setPromptUser("");
        if (responseAi) {
            const contentAi = {
                role: "assistant",
                prompt: responseAi,
                image: logoIaOrange,
            };
            setMessages((prev) => [...prev, contentAi]);
        } else {
            const contentAi = {
                role: "assistant",
                prompt: "Désoler une erreur est survenue",
                image: logoIaOrange,
            };
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
                        {isError && (
                            <ErrorBox
                                isError="true"
                                text="Une erreur est survenue"
                            />
                        )}
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
                                Posez vos questions sur votre porgramme,
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
                </div>
            </div>
        </dialog>
    );
}
