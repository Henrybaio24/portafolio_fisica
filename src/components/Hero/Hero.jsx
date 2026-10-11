import { motion } from "framer-motion";

import Lissajous from "../ui/Lissajous";
import { palette } from "../../data/palette";

const rgba = (a) => `rgba(${palette.accentRgb},${a})`;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Hero({ onEnter }) {
  return (
    <section
      id="inicio"
      className="font-body relative h-svh w-full overflow-hidden"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {/* Fondo: puntos */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Resplandor */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: "min(80vw, 80vh)",
          height: "min(80vw, 80vh)",
          backgroundColor: rgba(0.08),
        }}
      />

      {/* Figura de Lissajous */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "min(92vw, 92vh)", height: "min(92vw, 92vh)" }}
      >
        <Lissajous />
      </div>

      {/* Contenido */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{ gap: "clamp(0.75rem, 3vh, 2rem)" }}
      >
        <motion.p
          variants={item}
          style={{
            color: palette.muted,
            fontSize: "clamp(1rem, min(3vw, 3.4vh), 1.9rem)",
            letterSpacing: "0.04em",
          }}
        >
          Bienvenido a mi portafolio de
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display"
          style={{
            fontSize: "clamp(2.25rem, min(10.5vw, 15vh), 8rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          <span className="block font-bold">Física</span>
          <span
            className="block font-light"
            style={{
              color: palette.accent,
              textShadow: `0 0 28px ${rgba(0.35)}`,
            }}
          >
            Aplicada
          </span>
        </motion.h1>

        <motion.button
          variants={item}
          onClick={onEnter}
          whileHover={{
            scale: 1.05,
            backgroundColor: palette.accent,
            color: palette.bg,
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 rounded-full px-10 py-3 text-sm sm:text-base font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            border: `1px solid ${palette.accent}`,
            color: palette.accent,
            backgroundColor: rgba(0.08),
            outlineColor: palette.accent,
          }}
        >
          Ingresar
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;
