export const DIAS_BIENVENIDA = 7;

const CLAVE = "portafolio:bienvenida";

export function yaVioBienvenida() {
    if (new URLSearchParams(window.location.search).has("bienvenida")) return false;
    try {
        const cuando = Number(localStorage.getItem(CLAVE));
        return cuando > 0 && Date.now() - cuando < DIAS_BIENVENIDA * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
}

export function marcarBienvenida() {
    try {
        localStorage.setItem(CLAVE, String(Date.now()));
    } catch {

    }
}