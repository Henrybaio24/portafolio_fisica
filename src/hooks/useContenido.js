import { useEffect, useState } from "react";

import { leerHoja } from "../services/sheets";
import { config } from "../data/config";
import { trabajos as trabajosLocal } from "../data/trabajos";
import { silabo as silaboLocal } from "../data/silabo";
import { profile } from "../data/profile";

// Datos de respaldo: se usan mientras carga, si no hay Sheet configurado o si falla
const local = {
    trabajos: trabajosLocal,
    silabo: silaboLocal,
    cv: profile.cv ?? null,
};

const esVisible = (f) => (f.visible || "SI").toUpperCase() !== "NO";
const masNuevoPrimero = (a, b) => (b.fecha || "").localeCompare(a.fecha || "");

async function cargar() {
    if (!config.hojaArchivos) return local;

    const filas = (await leerHoja(config.hojaArchivos)).filter(esVisible);

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
            vista: null, // si es de Drive, la imagen previa sale sola del enlace
        }));

    // CV y sílabo: se usa el más reciente
    const masReciente = (seccion) =>
        filas.filter((f) => f.seccion === seccion).sort(masNuevoPrimero)[0];
    const cvFila = masReciente("cv");
    const silaboFila = masReciente("silabo");

    let unidades = local.silabo.unidades;
    if (config.hojaUnidades) {
        unidades = (await leerHoja(config.hojaUnidades))
            .filter(esVisible)
            .map((u) => ({
                numero: Number(u.numero),
                titulo: u.titulo,
                descripcion: u.descripcion,
                archivo: u.enlace || null,
            }))
            .sort((a, b) => a.numero - b.numero);
    }

    return {
        trabajos,
        cv: cvFila ? { archivo: cvFila.enlace } : local.cv,
        silabo: {
            ...local.silabo,
            archivo: silaboFila?.enlace ?? local.silabo.archivo,
            unidades,
        },
    };
}

// Se descarga una sola vez y se comparte entre todas las secciones
let promesa = null;

export function useContenido() {
    const [contenido, setContenido] = useState(local);

    useEffect(() => {
        let vivo = true;
        promesa ??= cargar().catch((e) => {
            console.warn("Usando datos locales:", e.message);
            return local;
        });
        promesa.then((d) => vivo && setContenido(d));
        return () => {
            vivo = false;
        };
    }, []);

    return contenido;
}