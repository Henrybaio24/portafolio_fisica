import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Atom, GraduationCap, Terminal } from "lucide-react";

import { palette } from "../../data/palette";

// Etiquetas que flotan alrededor del retrato (cámbialas a tu gusto)
const CHIPS = [
  {
    label: "Física",
    Icon: Atom,
    pos: "top-[9%] -right-2 sm:-right-10",
    dur: 4.2,
    delay: 0,
  },
  {
    label: "Informática",
    Icon: Terminal,
    pos: "top-[46%] -left-2 sm:-left-12",
    dur: 5,
    delay: 0.6,
  },
  {
    label: "Pedagogía",
    Icon: GraduationCap,
    pos: "bottom-[12%] -right-1 sm:-right-9",
    dur: 4.6,
    delay: 1.1,
  },
];

/**
 * Retrato animado: se inclina siguiendo el mouse, flota, tiene resplandor
 * y una línea de luz que lo recorre. Acepta imagen o un video corto en bucle.
 */
function Retrato({ imagen, video, alt = "Retrato" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const resorte = { stiffness: 140, damping: 16 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), resorte);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), resorte);

  const mover = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const salir = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={mover}
      onMouseLeave={salir}
      className="relative mx-auto"
      style={{
        perspective: 1100,
        height: "min(68vh, 600px)",
        aspectRatio: "900 / 1612",
      }}
    >
      {/* Resplandor que respira */}
      <motion.div
        className="absolute -inset-8 rounded-[2.5rem] blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at 25% 15%, rgba(${palette.accentRgb},0.35), transparent 60%), radial-gradient(circle at 80% 85%, rgba(139,92,246,0.4), transparent 60%)`,
        }}
        animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Inclinación 3D */}
      <motion.div
        className="relative w-full h-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Flotación */}
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Marco con la imagen */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {video ? (
              <video
                src={video}
                poster={imagen}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={imagen}
                alt={alt}
                className="w-full h-full object-cover"
              />
            )}

            {/* Línea de luz que recorre la imagen */}
            {!reduce && (
              <motion.div
                className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent)",
                }}
                animate={{ y: ["-100%", "320%"] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>

          {/* Etiquetas flotantes, con profundidad */}
          {CHIPS.map(({ label, Icon, pos, dur, delay }) => (
            <motion.div
              key={label}
              className={`absolute ${pos}`}
              style={{ z: 60 }}
              animate={reduce ? undefined : { y: [0, -9, 0] }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span
                className="font-body inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-semibold backdrop-blur-md"
                style={{
                  color: palette.text,
                  fontSize: "0.75rem",
                  backgroundColor: "rgba(13,13,16,0.72)",
                  border: `1px solid rgba(${palette.accentRgb},0.45)`,
                  boxShadow: `0 0 20px rgba(${palette.accentRgb},0.2)`,
                }}
              >
                <Icon
                  size={14}
                  strokeWidth={2}
                  style={{ color: palette.accent }}
                />
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Retrato;
