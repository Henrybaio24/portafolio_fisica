export function idDrive(url = "") {
    const m = url.match(/\/d\/([\w-]{10,})/) || url.match(/[?&]id=([\w-]{10,})/);
    return m ? m[1] : null;
}

export function urlVista(archivo, vista, ancho = 400) {
    if (vista) return vista;
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${ancho}` : null;
}

export function urlVer(archivo) {
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/file/d/${id}/view` : archivo;
}

export function urlDescargar(archivo) {
    const id = idDrive(archivo);
    return id ? `https://drive.google.com/uc?export=download&id=${id}` : archivo;
}