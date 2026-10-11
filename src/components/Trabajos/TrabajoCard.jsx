import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

import { TIPOS, formatearFecha } from "./tipos";
import { conAlpha } from "../../data/categorias";
import { palette } from "../../data/palette";
import { urlVer, urlVista } from "../../utils/archivos";

function TrabajoCard({ trabajo, categoria }) {
  const [cargada, setCargada] = useState(false);
  const [fallo, setFallo] = useState(false);

  const tipo = TIPOS[trabajo.tipo] ?? TIPOS.pdf;
  const { Icon } = tipo;
  const color = categoria.color;

  const vista = urlVista(trabajo.archivo, trabajo.vista, 400);
  // "Ver" abre el visor completo en una pestaña nueva
  const ver = urlVer(trabajo.archivo);

  return (
    <motion.article
      whileHover={{ y: -4, borderColor: conAlpha(color, 0.55) }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Franja del color de la categoría */}
      <div className="h-[3px] shrink-0" style={{ backgroundColor: color }} />

      {/* Imagen previa (clic = ver) */}
      <a
        href={ver}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${trabajo.titulo}`}
        className="group relative block h-36 shrink-0 overflow-hidden"
      >
        {/* Base: se ve al instante mientras llega la imagen (y si no llega) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${conAlpha(color, 0.22)}, ${conAlpha(color, 0.04)})`,
            color,
          }}
        >
          <Icon size={42} strokeWidth={1.4} />
        </div>

        {/* La imagen aparece con un fundido cuando termina de cargar */}
        {vista && !fallo && (
          <img
            src={vista}
            alt=""
            width="400"
            height="288"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setCargada(true)}
            onError={() => setFallo(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
              cargada ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <span
          className="font-mono-formula absolute top-3 left-3 rounded-md px-2 py-1 uppercase"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
          }}
        >
          {tipo.label}
        </span>

        {/* Al pasar el mouse */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span
            className="font-body inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold"
            style={{
              backgroundColor: color,
              color: "#0d0d10",
              fontSize: "0.75rem",
            }}
          >
            <Eye size={15} strokeWidth={2.2} />
            Ver
          </span>
        </span>
      </a>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span
          className="font-body self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold"
          style={{
            backgroundColor: conAlpha(color, 0.14),
            color,
            fontSize: "0.68rem",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          {categoria.label}
        </span>

        <h3
          className="font-body font-semibold leading-snug"
          style={{ color: palette.text, fontSize: "0.95rem" }}
        >
          {trabajo.titulo}
        </h3>

        <p
          className="font-body leading-relaxed line-clamp-2"
          style={{ color: palette.muted, fontSize: "0.78rem" }}
        >
          {trabajo.descripcion}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span
            className="font-body"
            style={{ color: palette.muted, fontSize: "0.72rem" }}
          >
            {formatearFecha(trabajo.fecha)}
          </span>
          <a
            href={ver}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex items-center gap-1.5 font-bold hover:underline"
            style={{ color, fontSize: "0.78rem" }}
          >
            <Eye size={14} strokeWidth={2} />
            Ver
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(TrabajoCard);
