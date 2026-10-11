import { config } from "../data/config";

// Enlace (CSV) de una pestaña del Sheet, armado con el sheetId de config.js
export const urlHoja = (pestana) =>
    config.sheetId
        ? `https://docs.google.com/spreadsheets/d/${config.sheetId}/gviz/tq?tqx=out:csv&headers=1&sheet=${pestana}`
        : "";

// Lee hojas de Google Sheets publicadas como CSV. No necesita claves ni librerías.

function parsearCSV(texto) {
    const filas = [];
    let fila = [];
    let campo = "";
    let comillas = false;

    for (let i = 0; i < texto.length; i++) {
        const c = texto[i];
        if (comillas) {
            if (c === '"') {
                if (texto[i + 1] === '"') {
                    campo += '"';
                    i++;
                } else {
                    comillas = false;
                }
            } else {
                campo += c;
            }
        } else if (c === '"') {
            comillas = true;
        } else if (c === ",") {
            fila.push(campo);
            campo = "";
        } else if (c === "\n") {
            fila.push(campo);
            filas.push(fila);
            fila = [];
            campo = "";
        } else if (c !== "\r") {
            campo += c;
        }
    }
    if (campo !== "" || fila.length) {
        fila.push(campo);
        filas.push(fila);
    }
    return filas;
}

// "Sección " -> "seccion"
const limpiar = (s) =>
    s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Devuelve una lista de objetos: [{ seccion: "...", titulo: "...", ... }]
export async function leerHoja(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`No se pudo leer la hoja (${res.status})`);

    const [cabecera, ...filas] = parsearCSV(await res.text());
    const claves = cabecera.map(limpiar);

    return filas
        .filter((f) => f.some((c) => c.trim() !== ""))
        .map((f) =>
            Object.fromEntries(claves.map((k, i) => [k, (f[i] ?? "").trim()])),
        );
}