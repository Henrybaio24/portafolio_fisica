// ID de tu Google Sheet: está en su dirección, entre /d/ y /edit.
// El Sheet debe estar compartido como "Cualquier persona con el enlace" (Lector).
// Sus pestañas deben llamarse "archivos" y "unidades".
export const config = {
    sheetId: "1TP1pPx9-jRgPvgwvywy9lJUeJR6rT0HaqeF2TjLU78E",
};

const csv = (pestana) =>
    `https://docs.google.com/spreadsheets/d/${config.sheetId}/gviz/tq?tqx=out:csv&headers=1&sheet=${pestana}`;

export const urlArchivos = config.sheetId ? csv("archivos") : "";
export const urlUnidades = config.sheetId ? csv("unidades") : "";