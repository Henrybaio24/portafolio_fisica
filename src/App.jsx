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
import Footer from "./components/Footer/Footer";
import { useFonts } from "./hooks/useFonts";
import { precargarContenido } from "./hooks/useContenido";
import { marcarBienvenida, yaVioBienvenida } from "./utils/bienvenida";
import { palette } from "./data/palette";

const CARGA_MINIMA_MS = 900;
const CARGA_MAXIMA_MS = 7000;

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

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

  const [entered, setEntered] = useState(() => yaVioBienvenida());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ backgroundColor: palette.bg, color: palette.text }}>
      <AnimatePresence mode="wait">
        {!entered && (
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
          <motion.div
            key="cargando"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Cargando />
          </motion.div>
        )}

        {entered && listo && (
          <motion.div
            key="sitio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar onMenuClick={() => setMenuOpen((v) => !v)} />
            <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

            <main className="pt-16 lg:ml-60 overflow-x-clip">
              <Portada />
              <Sobre />
              <Silabo />
              <Trabajos />
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
