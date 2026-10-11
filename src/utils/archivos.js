// Utilidades para archivos guardados en Google Drive.
// Con solo el enlace del archivo se obtienen: la imagen previa, el visor y la descarga.
// IMPORTANTE: el archivo debe estar compartido como "Cualquier persona con el enlace".

// Saca el ID del archivo de un enlace de Drive
export function idDrive(url = "") {
    const m = url.match(/\/d\/([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
    return m ? m[1] : null;
}

// Imagen previa: la que indiques o, si es de Drive, la miniatura que genera Drive
export function urlVista(archivo, vista) {
    if (vista) return vista;
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : null;
}

// Enlace para VER: abre el visor completo de Drive en una pestaña nueva
// (con zoom, imprimir, descargar, etc., igual que al abrir un PDF)
export function urlVer(archivo) {
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/file/d/${id}/view` : archivo;
}

// Enlace de descarga directa
export function urlDescargar(archivo) {
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/uc?export=download&id=${id}` : archivo;
}