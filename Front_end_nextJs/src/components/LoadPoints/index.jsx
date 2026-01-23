import styles from "./loadPoints.module.css";
import Image from "next/image";

export default function LoadPoints() {
    return (
        <div className={styles.containerLoad}>
            <div className={styles.containerLogo}>
                <Image
                    src="/icone/icone_ai_orange.png"
                    alt="Icone d'étoiles"
                    height={17}
                    width={15}
                />
            </div>
            <div className={styles.containerPoints}>
                <div className={styles.point}></div>
                <div className={styles.point}></div>
                <div className={styles.point}></div>
                <div className={styles.point}></div>
            </div>
        </div>
    );
}
