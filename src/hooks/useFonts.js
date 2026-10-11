import { useEffect } from "react";

const FONT_URL =
    "https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

// Inserta las fuentes de Google en el <head> una sola vez.
// (Si ya las cargas en index.html, este hook no hace daño.)
export function useFonts() {
    useEffect(() => {
        if (document.getElementById("app-fonts")) return;
        const link = document.createElement("link");
        link.id = "app-fonts";
        link.rel = "stylesheet";
        link.href = FONT_URL;
        document.head.appendChild(link);
    }, []);
}