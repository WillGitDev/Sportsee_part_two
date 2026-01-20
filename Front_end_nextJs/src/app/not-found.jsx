import styles from "./notFoundPage.module.css";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.notFound}>
                <h1 className={styles.title}>404</h1>
            </div>
            <div className={styles.content}>
                <p>La page demandée est introuvable</p>
            </div>
            <Link href="/">Retour à la page de connexion</Link>
        </div>
    );
}
