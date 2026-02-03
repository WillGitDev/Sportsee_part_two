"use client";
import Cookies from "js-cookie";
import data from "@/data/mockedData";

// Fonction pour les données Mocker.
// export function setCookie(data){
//     Cookies.set("auth_token", token, {expires: 7, path: "/"});
// }

export function setCookie(token, userId) {
    Cookies.set("auth_token", token, { expires: 7, path: "/" });
}

export function logout() {
    Cookies.remove("auth_token", { path: "/" });
    window.location.reload();
}

export function getToken() {
    const token = Cookies.get("auth_token");
    if (!token) {
        return false;
    }
    return token;
}
