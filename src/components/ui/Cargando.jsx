import { motion } from "framer-motion";

import AtomMark from "../Hero/AtomMark";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";

function Cargando() {
  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: palette.bg }}
      role="status"
      aria-label="Cargando"
    >
      <div
        className="w-24 h-24"
        style={{
          color: palette.accent,
          filter: `drop-shadow(0 0 14px rgba(${palette.accentRgb},0.4))`,
        }}
      >
        <AtomMark className="w-full h-full" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <p
          className="font-display uppercase"
          style={{ color: palette.muted, ...tipografia.etiqueta }}
        >
          Cargando portafolio
        </p>

        {/* Barra de progreso indeterminada */}
        <div
          className="w-40 h-[3px] rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="h-full w-1/3 rounded-full"
            style={{
              backgroundColor: palette.accent,
              boxShadow: `0 0 10px rgba(${palette.accentRgb},0.7)`,
            }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cargando;
