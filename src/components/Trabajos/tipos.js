import { FileSpreadsheet, FileText, Image as ImageIcon, Presentation } from "lucide-react";

// Tipos de archivo que acepta el portafolio
export const TIPOS = {
    pdf: { label: "PDF", Icon: FileText },
    word: { label: "Word", Icon: FileText },
    excel: { label: "Excel", Icon: FileSpreadsheet },
    powerpoint: { label: "PowerPoint", Icon: Presentation },
    imagen: { label: "Imagen", Icon: ImageIcon },
};

export function formatearFecha(fecha) {
    return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-EC", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}