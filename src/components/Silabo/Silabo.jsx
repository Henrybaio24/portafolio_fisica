import { motion } from "framer-motion";

import UnidadCard from "./UnidadCard";
import ArchivoCard from "../ui/ArchivoCard";
import { silabo } from "../../data/silabo";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Silabo() {
  const { unidades } = silabo;
  const documento = silabo.archivo
    ? { archivo: silabo.archivo, vista: silabo.vista }
    : null;

  return (
    <section
      id="silabo"
      className="scroll-mt-16 min-h-[calc(100svh-4rem)] lg:h-[calc(100svh-4rem)] flex items-center px-6 sm:px-12 lg:px-16 py-10 lg:py-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.4fr] gap-10 lg:gap-14 items-center lg:h-full lg:max-h-[600px]">
        {/* Izquierda: título, descripción y PDF del sílabo */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-start"
        >
          <motion.p
            variants={item}
            className="font-display uppercase"
            style={{ color: palette.accent, ...tipografia.etiqueta }}
          >
            Programa
          </motion.p>

          <motion.h2
            variants={item}
            className="font-display font-bold mt-2"
            style={{ color: palette.text, ...tipografia.titulo }}
          >
            Sílabo
          </motion.h2>

          <motion.p
            variants={item}
            className="font-body mt-4 max-w-md"
            style={{ color: palette.muted, ...tipografia.descripcion }}
          >
            Contenidos de {silabo.asignatura} organizados en {unidades.length}{" "}
            unidades.
          </motion.p>

          <motion.div variants={item} className="mt-8 w-full">
            <ArchivoCard
              etiqueta="Documento"
              titulo={`Sílabo de ${silabo.asignatura}`}
              archivo={documento}
              vacio="El PDF aún no se ha agregado"
            />
          </motion.div>
        </motion.div>

        {/* Derecha: las unidades en 2 x 2 */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:h-full lg:grid-rows-2 lg:min-h-0"
        >
          {unidades.map((u) => (
            <UnidadCard key={u.numero} unidad={u} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Silabo;
