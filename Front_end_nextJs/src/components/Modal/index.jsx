"use client";
import { useEffect, useRef } from "react";
import styles from "./modal.module.css";
import { useContext } from "react";
import { modalContext } from "@/contexts/ModalContext";
import { faX, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal() {
    const { isOpen, setIsOpen } = useContext(modalContext);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);
    return (
        <dialog
            ref={dialogRef}
            onClose={setIsOpen(false)}
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
                        <div className={styles.containerTitle}>
                            <h2 className={styles.title}>
                                Posez vos questions sur votre porgramme,
                                <br /> vos performances ou vos objectifs
                            </h2>
                        </div>
                    </div>
                    <div className={styles.containerChat}>
                        <form className={styles.form}>
                            <label htmlFor="chatInput"></label>
                            <textarea
                                placeholder="Comment puis-je vous aider"
                                rows="1"
                                cols="1"
                                name="chatInput"
                                id="chatInput"
                                className={styles.chatInput}
                            ></textarea>
                            <button type="submit" className={styles.submitBtn}>
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
