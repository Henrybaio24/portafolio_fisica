import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/ui/Navbar";
import Sidebar from "./components/ui/Sidebar";
import Hero from "./components/Hero/Hero";
import Portada from "./components/Portada/Portada";
import Sobre from "./components/Sobre/Sobre";
import Silabo from "./components/Silabo/Silabo";
import Trabajos from "./components/Trabajos/Trabajos";
import { useFonts } from "./hooks/useFonts";
import { palette } from "./data/palette";
import { tipografia } from "./data/tipografia";

// Espacio temporal para las secciones que aún no tienes.
// Cuando crees una, reemplaza su <Placeholder /> por el componente real.
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

function App() {
  useFonts();

  // false = se ve la bienvenida (Hero) | true = se ve el sitio
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ backgroundColor: palette.bg, color: palette.text }}>
      <AnimatePresence mode="wait">
        {!entered ? (
          /* 1. Pantalla de bienvenida con el botón Ingresar */
          <motion.div
            key="bienvenida"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onEnter={() => setEntered(true)} />
          </motion.div>
        ) : (
          /* 2. El sitio: barra, menú izquierdo y secciones */
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
