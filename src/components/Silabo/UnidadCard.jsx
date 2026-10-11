import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import { urlVer } from "../../utils/archivos";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const accent = (a) => `rgba(${palette.accentRgb},${a})`;

function UnidadCard({ unidad }) {
  const numero = String(unidad.numero).padStart(2, "0");

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -4, borderColor: accent(0.5) }}
      className="group relative h-full min-h-0 overflow-hidden rounded-2xl p-6 flex flex-col"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      {/* Número grande de fondo */}
      <span
        className="font-display font-bold leading-none absolute -top-1 right-4 pointer-events-none select-none opacity-[0.1] transition-opacity duration-300 group-hover:opacity-[0.22]"
        style={{ color: palette.accent, fontSize: "5.5rem" }}
        aria-hidden="true"
      >
        {numero}
      </span>

      {/* Etiqueta de la unidad */}
      <span
        className="relative self-start inline-flex items-center gap-2 rounded-full px-3 py-1 font-display uppercase"
        style={{
          color: palette.accent,
          backgroundColor: accent(0.1),
          border: `1px solid ${accent(0.3)}`,
          ...tipografia.etiqueta,
        }}
      >
        <span
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: palette.accent }}
        />
        Unidad {unidad.numero}
      </span>

      <h3
        className="relative font-body font-bold mt-5 leading-snug"
        style={{ color: palette.text, fontSize: "1.15rem" }}
      >
        {unidad.titulo}
      </h3>

      <p
        className="relative font-body mt-2"
        style={{ color: palette.muted, ...tipografia.descripcion }}
      >
        {unidad.descripcion}
      </p>

      {unidad.archivo && (
        <a
          href={urlVer(unidad.archivo)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative font-body mt-auto pt-4 inline-flex items-center gap-1.5 font-bold hover:underline self-start"
          style={{ color: palette.accent, fontSize: "0.78rem" }}
        >
          <Eye size={14} strokeWidth={2} />
          Ver PDF de la unidad
        </a>
      )}

      {/* Línea inferior que se llena al pasar el mouse */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{
          backgroundColor: palette.accent,
          boxShadow: `0 0 12px ${accent(0.6)}`,
        }}
      />
    </motion.article>
  );
}

export default UnidadCard;
