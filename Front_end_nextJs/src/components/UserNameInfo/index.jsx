import styles from "./userNameInfo.module.css";
import Image from "next/image";

export default function UserNameInfo({
    firstName,
    lastName,
    imgPath,
    dateStart,
}) {
    return (
        <div className={styles.nameInfo}>
            <div className={styles.containerImg}>
                <Image
                    className={styles.img}
                    src={imgPath}
                    width={100}
                    height={120}
                    alt="Photo de profil"
                    unoptimized
                />
            </div>
            <div className={styles.contentName}>
                <p className={styles.name}>{`${firstName} ${lastName}`}</p>
                <p>Membre depuis le {dateStart}</p>
            </div>
        </div>
    );
}
