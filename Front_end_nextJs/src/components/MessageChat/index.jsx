import styles from "./messageChat.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function MessageChat({ role, content, image }) {
    const isAssistant = role === "assistant" ? true : false;
    return (
        <div
            className={
                isAssistant ? styles.containerChatAi : styles.containerChatUser
            }
        >
            <div
                className={
                    isAssistant
                        ? `${styles.circleImg} ${styles.containerLogo}`
                        : `${styles.circleImg} ${styles.containerImg}`
                }
            >
                <Image
                    src={image}
                    alt={
                        isAssistant
                            ? "Une icone d'étoile"
                            : "Photo de profil de l'utilisateur"
                    }
                    height={15}
                    width={17}
                    className={isAssistant ? styles.starLogo : styles.profilImg}
                    unoptimized
                />
            </div>
            <div
                className={
                    isAssistant
                        ? `${styles.chatBot} ${styles.chatBotIa}`
                        : `${styles.chatBot} ${styles.chatBotUser}`
                }
            >
                <p className={styles.coachAi}>
                    {isAssistant ? "Coach IA" : ""}
                </p>
                <div
                    className={
                        isAssistant
                            ? `${styles.chatIa} ${styles.chat}`
                            : `${styles.chatUser} ${styles.chat}`
                    }
                >
                    <div
                        className={
                            isAssistant
                                ? `${styles.content} ${styles.contentIa}`
                                : `${styles.content} ${styles.contentUser}`
                        }
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
