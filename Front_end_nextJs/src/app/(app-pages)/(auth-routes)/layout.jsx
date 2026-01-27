import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "./layout.module.css";

export default function AppLayout({ children }) {
    return (
        <div className={styles.page}>
            <div className={styles.appContainer}>
                <Header />
                <main className={styles.main}>{children}</main>
            </div>
            <Footer />
        </div>
    );
}
