// Lista CERRADA de categorías. La IA solo podrá elegir entre estas.
// Si agregas una, aparece sola en los filtros de Trabajos.
export const categorias = [
    { id: "individual", label: "Individual", color: "#60a5fa" },
    { id: "grupal", label: "Grupal", color: "#a78bfa" },
    { id: "mapas", label: "Mapas mentales", color: "#34d399" },
    { id: "pruebas", label: "Pruebas", color: "#fb7185" },
    { id: "diapositivas", label: "Diapositivas", color: "#fb923c" },
    { id: "laboratorios", label: "Laboratorios", color: "#22d3ee" },
    { id: "ensayos", label: "Ensayos", color: "#e879f9" },
];

// Convierte "#60a5fa" en "rgba(96,165,250,0.2)"
export function conAlpha(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}