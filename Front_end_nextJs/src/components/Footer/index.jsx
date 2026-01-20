import Icone from "@components/Icone";
import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.sportseeInc}>
                <p>©Sportsee Tous droits réservés</p>
            </div>
            <div className={styles.contentRight}>
                <p>Conditions générales</p>
                <p>Contact</p>
                <Icone />
            </div>
        </footer>
    );
}
