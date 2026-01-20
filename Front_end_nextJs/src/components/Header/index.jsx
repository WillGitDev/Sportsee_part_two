"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { logout } from "@/cookies/auth.js";
import { useRouter, usePathname } from "next/navigation";
import Icone from "@components/Icone";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    function handleLogout() {
        logout();
        router.push("/");
    }
    return (
        <header className={styles.container}>
            <div className={styles.containerLogo}>
                <Icone />
                <p className={styles.textLogo}>SPORTSEE</p>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link
                            href="/dashboard"
                            className={
                                pathname === "/dashboard"
                                    ? styles.activeLink
                                    : ""
                            }
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className={styles.li}>Coach</li>
                    <li className={styles.li}>
                        <Link
                            href="/profil"
                            className={
                                pathname === "/profil" ? styles.activeLink : ""
                            }
                        >
                            Mon profil
                        </Link>
                    </li>
                    <li className={styles.li}>|</li>
                    <li className={`${styles.li} ${styles.deconnection}`}>
                        <button
                            className={styles.logout}
                            onClick={handleLogout}
                        >
                            Se déconnecter
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
