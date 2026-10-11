import { motion } from "framer-motion";
import { ArrowDown, Landmark, GraduationCap } from "lucide-react";

import Osciloscopio from "./Osciloscopio";
import { palette } from "../../data/palette";
import { profile } from "../../data/profile";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const card = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const etiqueta = {
  color: palette.accent,
  fontSize: "0.6rem",
  letterSpacing: "0.14em",
  fontStyle: "normal",
};

/* Facultad / carrera: compacto, icono + etiqueta + valor */
function Fila({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="shrink-0 flex items-center justify-center w-7 h-7 rounded-md"
        style={{
          backgroundColor: `rgba(${palette.accentRgb},0.1)`,
          border: `1px solid rgba(${palette.accentRgb},0.25)`,
          color: palette.accent,
        }}
      >
        <Icon size={14} strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="font-display uppercase font-normal" style={etiqueta}>
          {label}
        </p>
        <p
          className="font-body font-medium leading-snug mt-1"
          style={{
            color: palette.text,
            fontSize: "clamp(0.75rem, 1vw, 0.82rem)",
            fontStyle: "normal",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Dato({ label, value, className = "" }) {
  return (
    <div className={`rounded-lg px-4 py-2.5 ${className}`} style={card}>
      <p className="font-display uppercase font-normal" style={etiqueta}>
        {label}
      </p>
      <p
        className="font-body font-semibold mt-1"
        style={{
          color: palette.text,
          fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Portada() {
  const periodo = profile.periodo.replace(/^per[ií]odo\s*/i, "");

  const irASobre = () =>
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="portada"
      className="relative min-h-[calc(100svh-4rem)] scroll-mt-16 overflow-hidden flex items-center"
    >
      {/* Fondo: puntos + resplandor */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: `rgba(${palette.accentRgb},0.07)` }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-x-16 gap-y-8 lg:gap-y-12 items-center"
      >
        {/* Fila superior: facultad (izquierda) y carrera (derecha) */}
        <motion.div variants={item} className="self-start">
          <Fila Icon={Landmark} label="Facultad" value={profile.facultad} />
        </motion.div>
        <motion.div
          variants={item}
          className="self-start w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:ml-auto"
        >
          <Fila Icon={GraduationCap} label="Carrera" value={profile.carrera} />
        </motion.div>

        {/* Columna izquierda: título, datos y botón */}
        <div className="flex flex-col items-start">
          {/* Título */}
          <motion.h1
            variants={item}
            className="font-display mt-6"
            style={{
              fontSize: "clamp(2rem, min(4.8vw, 8vh), 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block font-bold" style={{ color: palette.text }}>
              Física
            </span>
            <span
              className="block font-light"
              style={{
                color: palette.accent,
                textShadow: `0 0 28px rgba(${palette.accentRgb},0.3)`,
              }}
            >
              Aplicada
            </span>
          </motion.h1>

          {/* Datos del estudiante */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 gap-2.5 mt-6 w-full max-w-sm"
          >
            <Dato
              label="Estudiante"
              value={profile.nombre}
              className="col-span-2"
            />
            <Dato label="Nivel" value={profile.curso} />
            <Dato label="Período" value={periodo} />
          </motion.div>

          {/* Botón */}
          <motion.button
            variants={item}
            onClick={irASobre}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="font-body mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8rem] font-semibold transition-shadow hover:shadow-[0_0_28px_rgba(242,184,75,0.35)]"
            style={{ backgroundColor: palette.accent, color: palette.bg }}
          >
            Conocer más
            <ArrowDown size={14} strokeWidth={2.2} />
          </motion.button>
        </div>

        {/* Columna derecha: osciloscopio */}
        <motion.div
          variants={item}
          className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:ml-auto"
        >
          <Osciloscopio />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Portada;
