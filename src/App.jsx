import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/ui/Navbar";
import Cargando from "./components/ui/Cargando";
import Sidebar from "./components/ui/Sidebar";
import Hero from "./components/Hero/Hero";
import Portada from "./components/Portada/Portada";
import Sobre from "./components/Sobre/Sobre";
import Silabo from "./components/Silabo/Silabo";
import Trabajos from "./components/Trabajos/Trabajos";
import { useFonts } from "./hooks/useFonts";
import { precargarContenido } from "./hooks/useContenido";
import { marcarBienvenida, yaVioBienvenida } from "./utils/bienvenida";
import { palette } from "./data/palette";
import { tipografia } from "./data/tipografia";

function Placeholder({ id, label }) {
  return (
    <section
      id={id}
      className="min-h-svh scroll-mt-16 px-6 sm:px-12 py-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <h2
        className="font-display font-bold"
        style={{ color: palette.text, ...tipografia.titulo }}
      >
        {label}
      </h2>
      <p
        className="font-body mt-4"
        style={{ color: palette.muted, ...tipografia.descripcion }}
      >
        Contenido de esta sección próximamente.
      </p>
    </section>
  );
}

const CARGA_MINIMA_MS = 900; // la pantalla de carga se ve al menos este tiempo (evita parpadeos)
const CARGA_MAXIMA_MS = 7000; // si algo tarda más, se entra igual

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Se vuelve true cuando ya están los datos del Sheet y las fuentes
function useListo() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    let vivo = true;
    const tareas = Promise.all([
      precargarContenido(),
      document.fonts ? document.fonts.ready : null,
      esperar(CARGA_MINIMA_MS),
    ]);
    Promise.race([tareas, esperar(CARGA_MAXIMA_MS)]).then(
      () => vivo && setListo(true),
    );
    return () => {
      vivo = false;
    };
  }, []);

  return listo;
}

function App() {
  useFonts();
  const listo = useListo();

  // La bienvenida se muestra la primera vez y de nuevo pasados unos días
  const [entered, setEntered] = useState(() => yaVioBienvenida());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ backgroundColor: palette.bg, color: palette.text }}>
      <AnimatePresence mode="wait">
        {!entered && (
          /* 1. Pantalla de bienvenida con el botón Ingresar */
          <motion.div
            key="bienvenida"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5 }}
          >
            <Hero
              onEnter={() => {
                marcarBienvenida();
                setEntered(true);
              }}
            />
          </motion.div>
        )}

        {entered && !listo && (
          /* 2. Pantalla de carga: solo si los datos aún no están listos */
          <motion.div
            key="cargando"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Cargando />
          </motion.div>
        )}

        {entered && listo && (
          /* 3. El sitio: barra, menú izquierdo y secciones */
          <motion.div
            key="sitio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar onMenuClick={() => setMenuOpen((v) => !v)} />
            <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

            <main className="pt-16 lg:ml-60">
              <Portada />
              <Sobre />
              <Silabo />
              {/*<Placeholder id="laboratorio" label="Laboratorio" />*/}
              <Trabajos />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
