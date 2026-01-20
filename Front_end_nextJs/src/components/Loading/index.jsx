import styles from "./loading.module.css";

export default function Loading({ isLoading }) {
    // debugger;
    if (!isLoading) return;
    return (
        <div className={styles.containerLoading}>
            <div className={styles.spinner}></div>
            <p className={styles.loadText}>Chargement ...</p>
        </div>
    );
}
