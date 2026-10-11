import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import TrabajoCard from "./TrabajoCard";
import { categorias, conAlpha } from "../../data/categorias";
import { useContenido } from "../../hooks/useContenido";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";

const porId = Object.fromEntries(categorias.map((c) => [c.id, c]));

function Filtro({ label, count, color, activo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-body inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-semibold transition-colors"
      style={{
        fontSize: "0.75rem",
        color: activo ? color : palette.muted,
        backgroundColor: activo ? conAlpha(color, 0.14) : "transparent",
        border: `1px solid ${activo ? conAlpha(color, 0.6) : "rgba(255,255,255,0.1)"}`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
      <span style={{ opacity: 0.6 }}>{count}</span>
    </button>
  );
}

function TrabajosTodos({ onVolver }) {
  const { trabajos } = useContenido();
  const [filtro, setFiltro] = useState("todos");
  const listaRef = useRef(null);

  const visibles =
    filtro === "todos"
      ? trabajos
      : trabajos.filter((t) => t.categoria === filtro);
  const contar = (id) => trabajos.filter((t) => t.categoria === id).length;

  const elegir = (id) => {
    setFiltro(id);
    listaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Encabezado */}
      <header className="shrink-0 flex items-center justify-between gap-4">
        <h2
          className="font-display font-bold"
          style={{
            color: palette.text,
            ...tipografia.titulo,
          }}
        >
          Todos los trabajos
        </h2>

        <div className="flex items-center gap-4">
          <p
            className="font-body"
            style={{ color: palette.muted, fontSize: "0.8rem" }}
          >
            <span style={{ color: palette.text }}>{visibles.length}</span> de{" "}
            {trabajos.length}
          </p>
          <button
            onClick={onVolver}
            aria-label="Cerrar"
            title="Cerrar (Esc)"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{
              color: palette.text,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Filtros */}
      <div className="shrink-0 flex flex-wrap gap-2 mt-4">
        <Filtro
          label="Todos"
          count={trabajos.length}
          color={palette.accent}
          activo={filtro === "todos"}
          onClick={() => elegir("todos")}
        />
        {categorias.map((c) => (
          <Filtro
            key={c.id}
            label={c.label}
            count={contar(c.id)}
            color={c.color}
            activo={filtro === c.id}
            onClick={() => elegir(c.id)}
          />
        ))}
      </div>

      {/* Tarjetas: solo esta zona se desplaza (en pantallas grandes) */}
      <div
        ref={listaRef}
        className="mt-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 lg:pb-8 lg:[mask-image:linear-gradient(to_bottom,black_94%,transparent)] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {visibles.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <TrabajoCard
                  trabajo={t}
                  categoria={porId[t.categoria] ?? categorias[0]}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibles.length === 0 && (
          <p
            className="font-body text-center mt-16"
            style={{ color: palette.muted, fontSize: "0.85rem" }}
          >
            Aún no hay trabajos en esta categoría.
          </p>
        )}
      </div>
    </div>
  );
}

export default TrabajosTodos;
