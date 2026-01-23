import styles from "./errorBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function ErrorBox({ isError, text }) {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(isError);
    }, [isError]);

    if (!isOpen) return;
    return (
        <div className={styles.containerError}>
            <button
                className={styles.xMarkButton}
                onClick={() => setIsOpen(false)}
            >
                <FontAwesomeIcon icon={faX} className={styles.xMark} />
            </button>
            <p className={styles.textError}>{text}</p>
        </div>
    );
}
