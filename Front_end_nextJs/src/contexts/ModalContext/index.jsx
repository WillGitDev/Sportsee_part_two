"use client";
import { createContext, useState } from "react";

export const modalContext = createContext(null);

export default function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <modalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </modalContext.Provider>
    );
}
