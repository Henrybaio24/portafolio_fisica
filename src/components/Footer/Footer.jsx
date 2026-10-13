import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";

import CodigoMark from "../ui/CodigoMark";
import GithubIcon from "../ui/GithubIcon";
import { palette } from "../../data/palette";
import { profile } from "../../data/profile";

const accent = (a) => `rgba(${palette.accentRgb},${a})`;

function EnlaceContacto({ href, Icon, texto, externo = false }) {
  return (
    <motion.a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      whileHover={{ color: palette.accent }}
      className="font-body inline-flex items-center gap-2 font-semibold"
      style={{ color: palette.muted, fontSize: "0.78rem" }}
    >
      <Icon size={16} strokeWidth={1.9} />
      {texto}
    </motion.a>
  );
}

function Footer() {
  const anio = new Date().getFullYear();
  const subir = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative px-6 sm:px-12 lg:px-16 pt-12 pb-8">
      {/* Línea superior con degradado */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${accent(0.5)}, transparent)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Identidad y volver arriba */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 shrink-0"
              style={{
                color: palette.accent,
                filter: `drop-shadow(0 0 10px ${accent(0.35)})`,
              }}
            >
              <CodigoMark className="w-full h-full" />
            </div>
            <div>
              <p
                className="font-display font-bold"
                style={{
                  color: palette.text,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {profile.nombre}
              </p>
              <p
                className="font-body mt-1"
                style={{ color: palette.muted, fontSize: "0.78rem" }}
              >
                Portafolio de Física Aplicada
              </p>
            </div>
          </div>

          <button
            onClick={subir}
            className="font-body self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold transition-colors hover:bg-white/5"
            style={{
              color: palette.text,
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: "0.78rem",
            }}
          >
            Volver arriba
            <ArrowUp
              size={15}
              strokeWidth={2.2}
              style={{ color: palette.accent }}
            />
          </button>
        </div>

        <div
          className="mt-8 pt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="font-body"
            style={{
              color: palette.muted,
              fontSize: "0.75rem",
              lineHeight: 1.7,
            }}
          >
            © {anio} · {profile.universidad} · {profile.periodo}
          </p>

          <div className="flex items-center gap-6">
            {profile.correo && (
              <EnlaceContacto
                href={`mailto:${profile.correo}`}
                Icon={Mail}
                texto="Correo"
              />
            )}
            {profile.github && (
              <EnlaceContacto
                href={profile.github}
                Icon={GithubIcon}
                texto="GitHub"
                externo
              />
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;
