import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import TrabajosResumen from "./TrabajosResumen";
import TrabajosTodos from "./TrabajosTodos";
import { palette } from "../../data/palette";

// La sección muestra las estadísticas (con barra y menú, como las demás).
// "Ver todos" abre la galería a pantalla completa, encima de todo.
function Trabajos() {
  const [verTodos, setVerTodos] = useState(false);

  // Con la galería abierta: se bloquea el scroll de atrás y Esc la cierra
  useEffect(() => {
    if (!verTodos) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const alTeclear = (e) => e.key === "Escape" && setVerTodos(false);
    window.addEventListener("keydown", alTeclear);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", alTeclear);
    };
  }, [verTodos]);

  return (
    <>
      <section
        id="trabajos"
        className="scroll-mt-16 min-h-[calc(100svh-4rem)] lg:h-[calc(100svh-4rem)] flex flex-col px-6 sm:px-12 lg:px-16 py-6 lg:py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col flex-1 min-h-0">
          <TrabajosResumen onVerTodos={() => setVerTodos(true)} />
        </div>
      </section>

      {/* Galería a pantalla completa: tapa la barra y el menú */}
      <AnimatePresence>
        {verTodos && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto lg:overflow-hidden"
            style={{ backgroundColor: palette.bg }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="min-h-full lg:h-full flex flex-col w-full max-w-[1900px] mx-auto px-6 sm:px-10 py-6 lg:py-7">
              <TrabajosTodos onVolver={() => setVerTodos(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Trabajos;
