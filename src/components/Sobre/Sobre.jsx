import { motion } from "framer-motion";

import Retrato from "./Retrato";
import CvCard from "./CvCard";
import yo from "../../assets/yo.jpg";
import { palette } from "../../data/palette";
import { tipografia } from "../../data/tipografia";
import { profile } from "../../data/profile";
import { useContenido } from "../../hooks/useContenido";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Sobre() {
  const { cv } = useContenido();
  // Si no pones "sobreMi" en profile.js, se usa este texto con tus datos
  const texto =
    profile.sobreMi ??
    `Soy ${profile.nombre}, estudiante de ${profile.curso.toLowerCase()} de ${profile.carrera} en la ${profile.universidad}. Este portafolio reúne mis trabajos de Física Aplicada: laboratorios, ensayos, pruebas y proyectos del semestre.`;

  return (
    <section
      id="sobre"
      className="scroll-mt-16 min-h-[calc(100svh-4rem)] flex items-center px-6 sm:px-12 lg:px-16 py-12"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-20 items-center">
        {/* Retrato animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="px-6 sm:px-10"
        >
          <Retrato imagen={yo} video={profile.video} alt={profile.nombre} />
        </motion.div>

        {/* Texto y CV */}
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
            Perfil
          </motion.p>

          <motion.h2
            variants={item}
            className="font-display font-bold mt-2"
            style={{
              color: palette.text,
              ...tipografia.titulo,
            }}
          >
            Sobre mí
          </motion.h2>

          <motion.p
            variants={item}
            className="font-body mt-5 max-w-xl leading-relaxed"
            style={{ color: palette.muted, ...tipografia.descripcion }}
          >
            {texto}
          </motion.p>

          <motion.div variants={item} className="mt-8 w-full">
            <CvCard cv={cv} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Sobre;
