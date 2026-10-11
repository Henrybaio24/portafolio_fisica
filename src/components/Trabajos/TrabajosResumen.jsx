import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { categorias, conAlpha } from "../../data/categorias";
import { useContenido } from "../../hooks/useContenido";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";

const panel = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const etiqueta = {
  color: palette.accent,
  ...tipografia.etiqueta,
};

const glow = (a) =>
  `0 0 ${20 + a * 30}px rgba(${palette.accentRgb},${0.2 + a * 0.35})`;

/* Número que sube de 0 hasta su valor */
function ContadorAnimado({ valor }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const control = animate(0, valor, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => control.stop();
  }, [valor]);
  return <>{n}</>;
}

function TrabajosResumen({ onVerTodos }) {
  const { trabajos } = useContenido();
  const total = trabajos.length;
  const conteoCategoria = categorias.map((c) => ({
    ...c,
    count: trabajos.filter((t) => t.categoria === c.id).length,
  }));
  const maximo = Math.max(1, ...conteoCategoria.map((c) => c.count));

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4">
      {/* Encabezado */}
      <header className="shrink-0 flex items-center justify-between gap-4">
        <div>
          <p className="font-display uppercase" style={etiqueta}>
            Portafolio
          </p>
          <h2
            className="font-display font-bold mt-1"
            style={{
              color: palette.text,
              ...tipografia.titulo,
            }}
          >
            Trabajos
          </h2>
        </div>

        {/* Botón destacado: brillo que late + flecha que se mueve */}
        <motion.button
          onClick={onVerTodos}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          animate={{ boxShadow: [glow(0), glow(1), glow(0)] }}
          transition={{
            boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="font-body inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-bold"
          style={{
            backgroundColor: palette.accent,
            color: palette.bg,
            fontSize: "0.95rem",
            letterSpacing: "0.01em",
          }}
        >
          Ver todos
          <motion.span
            className="flex"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.span>
        </motion.button>
      </header>

      {/* Estadísticas */}
      <div className="grid lg:grid-cols-12 gap-4 lg:flex-1 lg:min-h-0">
        {/* Total */}
        <div
          className="lg:col-span-4 rounded-2xl p-6 flex flex-col"
          style={panel}
        >
          <p className="font-display uppercase" style={etiqueta}>
            Total
          </p>
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
            <p
              className="font-display font-bold leading-none"
              style={{
                color: palette.accent,
                fontSize: "clamp(4.5rem, 14vh, 8rem)",
                textShadow: `0 0 40px rgba(${palette.accentRgb},0.35)`,
              }}
            >
              <ContadorAnimado valor={total} />
            </p>
            <p
              className="font-body mt-4"
              style={{ color: palette.muted, fontSize: "0.85rem" }}
            >
              trabajos subidos este semestre
            </p>
          </div>
        </div>

        {/* Barras por categoría */}
        <div
          className="lg:col-span-8 rounded-2xl p-6 flex flex-col"
          style={panel}
        >
          <p className="font-display uppercase" style={etiqueta}>
            Por categoría
          </p>
          <div className="flex flex-col justify-around gap-3 flex-1 mt-4">
            {conteoCategoria.map((c, i) => (
              <div
                key={c.id}
                className="grid grid-cols-[8rem_1fr_2rem] items-center gap-4"
              >
                <span
                  className="font-body inline-flex items-center gap-2 truncate"
                  style={{ color: palette.text, fontSize: "0.85rem" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.label}
                </span>
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: c.color,
                      boxShadow: `0 0 12px ${conAlpha(c.color, 0.5)}`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.count / maximo) * 100}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.15 + i * 0.07,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <span
                  className="font-body font-semibold text-right"
                  style={{ color: palette.text, fontSize: "0.9rem" }}
                >
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrabajosResumen;
