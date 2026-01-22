import styles from "./messageChat.module.css";
import Image from "next/image";

export default function MessageChat({ role, content, image }) {
    const isAi = role === "ai" ? true : false;
    return (
        <div
            className={isAi ? styles.containerChatAi : styles.containerChatUser}
        >
            <div
                className={
                    isAi
                        ? `${styles.circleImg} ${styles.containerLogo}`
                        : `${styles.circleImg} ${styles.containerImg}`
                }
            >
                <Image
                    src={image}
                    alt={
                        isAi
                            ? "Une icone d'étoile"
                            : "Photo de profil de l'utilisateur"
                    }
                    height={15}
                    width={17}
                    className={isAi ? styles.starLogo : styles.profilImg}
                    unoptimized
                />
            </div>
            <div
                className={
                    isAi
                        ? `${styles.chatBot} ${styles.chatBotIa}`
                        : `${styles.chatBot} ${styles.chatBotUser}`
                }
            >
                <p className={styles.coachAi}>{isAi ? "Coach IA" : ""}</p>
                <div
                    className={
                        isAi
                            ? `${styles.chatIa} ${styles.chat}`
                            : `${styles.chatUser} ${styles.chat}`
                    }
                >
                    <p
                        className={
                            isAi
                                ? `${styles.content} ${styles.contentIa}`
                                : `${styles.content} ${styles.contentUser}`
                        }
                    >
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
