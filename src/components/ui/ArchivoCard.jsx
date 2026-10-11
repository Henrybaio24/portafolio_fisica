import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";

import { urlDescargar, urlVer, urlVista } from "../../utils/archivos";
import { palette } from "../../data/palette";

function ArchivoCard({
  etiqueta,
  titulo,
  archivo,
  vacio = "Aún no se ha agregado",
}) {
  const [fallo, setFallo] = useState(false);

  const vista = archivo ? urlVista(archivo.archivo, archivo.vista, 240) : null;
  const ver = archivo ? urlVer(archivo.archivo) : null;
  const descargar = archivo ? urlDescargar(archivo.archivo) : null;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="rounded-2xl p-4 flex gap-4 items-center max-w-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Imagen previa */}
      <a
        href={ver ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${titulo}`}
        className="relative shrink-0 w-24 rounded-lg overflow-hidden block"
        style={{
          aspectRatio: "3 / 4",
          border: "1px solid rgba(255,255,255,0.14)",
          pointerEvents: ver ? "auto" : "none",
        }}
      >
        {vista && !fallo ? (
          <img
            src={vista}
            alt=""
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
            onError={() => setFallo(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(${palette.accentRgb},0.22), rgba(${palette.accentRgb},0.04))`,
              color: palette.accent,
            }}
          >
            <FileText size={32} strokeWidth={1.4} />
          </div>
        )}
      </a>

      <div className="min-w-0">
        <p
          className="font-display uppercase"
          style={{
            color: palette.accent,
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
          }}
        >
          {etiqueta}
        </p>
        <h3
          className="font-body font-semibold mt-1"
          style={{ color: palette.text, fontSize: "1rem" }}
        >
          {titulo}
        </h3>
        <p
          className="font-body mt-1"
          style={{ color: palette.muted, fontSize: "0.75rem" }}
        >
          {archivo ? "Se abre en una pestaña nueva" : vacio}
        </p>

        {archivo && (
          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href={ver}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-bold transition-shadow hover:shadow-[0_0_22px_rgba(242,184,75,0.4)]"
              style={{
                backgroundColor: palette.accent,
                color: palette.bg,
                fontSize: "0.75rem",
              }}
            >
              <Eye size={14} strokeWidth={2.2} />
              Ver
            </a>
            <a
              href={descargar}
              download
              className="font-body inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold transition-colors hover:bg-white/5"
              style={{
                color: palette.text,
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "0.75rem",
              }}
            >
              <Download size={14} strokeWidth={2} />
              Descargar
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ArchivoCard;
