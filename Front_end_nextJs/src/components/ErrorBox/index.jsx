import styles from "./errorBox.module.css";

export default function ErrorBox({ isError, text }) {
    if (!isError) return;
    return (
        <div className={styles.containerError}>
            <p className={styles.textError}>{text}</p>
        </div>
    );
}
