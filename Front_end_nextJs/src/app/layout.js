import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/contexts/UserContext";
import ModalProvider from "@/contexts/ModalContext";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata = {
    title: "Sportsee",
    description: "Transformez vos stats en résultats",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <UserProvider>
                    <ModalProvider>{children}</ModalProvider>
                </UserProvider>
            </body>
        </html>
    );
}
