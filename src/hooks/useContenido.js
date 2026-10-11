import { useEffect, useState } from "react";

import { leerHoja, urlHoja } from "../services/sheets";
import { trabajos as trabajosLocal } from "../data/trabajos";
import { silabo as silaboLocal } from "../data/silabo";
import { profile } from "../data/profile";

const local = {
    trabajos: trabajosLocal,
    silabo: silaboLocal,
    cv: profile.cv ?? null,
};
const vacio = {
    trabajos: [],
    silabo: { ...silaboLocal, archivo: null, unidades: [] },
    cv: null,
};
const urlArchivos = urlHoja("archivos");
const urlUnidades = urlHoja("unidades");
const usarSheet = Boolean(urlArchivos);
const respaldo = usarSheet ? vacio : local;

const esVisible = (f) => (f.visible || "SI").toUpperCase() !== "NO";
const masNuevoPrimero = (a, b) => (b.fecha || "").localeCompare(a.fecha || "");

async function cargar() {
    if (!usarSheet) return local;

    const filas = (await leerHoja(urlArchivos)).filter(esVisible);

    const trabajos = filas
        .filter((f) => f.seccion === "trabajo")
        .sort(masNuevoPrimero)
        .map((f, i) => ({
            id: i + 1,
            titulo: f.titulo,
            categoria: f.categoria,
            tipo: (f.tipo || "pdf").toLowerCase(),
            descripcion: f.descripcion,
            fecha: f.fecha,
            archivo: f.enlace,
            vista: null, // la imagen previa sale sola del enlace de Drive
        }));

    const masReciente = (seccion) =>
        filas.filter((f) => f.seccion === seccion).sort(masNuevoPrimero)[0];
    const cv = masReciente("cv");
    const silabo = masReciente("silabo");

    const unidades = (await leerHoja(urlUnidades))
        .filter(esVisible)
        .map((u) => ({
            numero: Number(u.numero),
            titulo: u.titulo,
            descripcion: u.descripcion,
            archivo: u.enlace || null,
        }))
        .sort((a, b) => a.numero - b.numero);

    const documentos = [
        cv && { fila: cv, titulo: "Curriculum Vitae", descripcion: "Currículum vitae del estudiante." },
        silabo && { fila: silabo, titulo: "Sílabo de la asignatura", descripcion: "Sílabo con las unidades y contenidos del curso." },
    ]
        .filter(Boolean)
        .map(({ fila, titulo, descripcion }) => ({
            titulo: fila.titulo || titulo,
            categoria: "documentos",
            tipo: (fila.tipo || "pdf").toLowerCase(),
            descripcion: fila.descripcion || descripcion,
            fecha: fila.fecha,
            archivo: fila.enlace,
            vista: null,
        }));

    const todos = [...trabajos, ...documentos]
        .sort(masNuevoPrimero)
        .map((t, i) => ({ ...t, id: i + 1 }));

    return {
        trabajos: todos,
        cv: cv ? { archivo: cv.enlace } : null,
        silabo: { ...local.silabo, archivo: silabo?.enlace ?? null, unidades },
    };
}

let promesa = null;
let cache = null;

export function precargarContenido() {
    promesa ??= cargar()
        .catch((e) => {
            console.warn("No se pudo leer el Sheet:", e.message);
            return respaldo;
        })
        .then((d) => (cache = d));
    return promesa;
}

export function useContenido() {
    const [contenido, setContenido] = useState(cache ?? respaldo);

    useEffect(() => {
        let vivo = true;
        precargarContenido().then((d) => vivo && setContenido(d));
        return () => {
            vivo = false;
        };
    }, []);

    return contenido;
}