import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Mail } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { navSections } from "../../data/navigation";
import { palette } from "../../data/palette";
import { profile } from "../../data/profile";

// GitHub no viene en lucide-react (lo quitaron por ser marca), por eso va como SVG propio
function GithubIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="p-2 rounded-lg transition-colors"
      style={{ color: palette.muted }}
      onMouseEnter={(e) => (e.currentTarget.style.color = palette.accent)}
      onMouseLeave={(e) => (e.currentTarget.style.color = palette.muted)}
    >
      {children}
    </a>
  );
}

const sectionIds = navSections.map((s) => s.id);

function Navbar({ onMenuClick }) {
  const activeId = useScrollSpy(sectionIds);

  // En la portada se muestra la universidad; en las demás, el nombre de la sección
  const enPortada = activeId === "portada";
  const textoCentro = enPortada
    ? profile.universidad
    : (navSections.find((s) => s.id === activeId)?.label ??
      profile.universidad);
  return (
    <>
      <ScrollProgress />

      <header
        className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center gap-3 px-4 sm:px-8 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(13,13,16,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Botón hamburguesa - solo móvil/tablet */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2"
          style={{ color: palette.text }}
          aria-label="Abrir menú"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Título en dos líneas, a la izquierda */}
        <div className="hidden sm:flex flex-col leading-none shrink-0">
          <span
            className="font-body font-semibold uppercase"
            style={{
              color: palette.muted,
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
            }}
          >
            Portafolio
          </span>
          <span
            className="font-display font-bold mt-1"
            style={{
              color: palette.text,
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Física <span style={{ color: palette.accent }}>Aplicada</span>
          </span>
        </div>

        {/* Centro: universidad en la portada, sección actual en las demás (solo pantallas grandes) */}
        <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={textoCentro}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="font-body font-semibold uppercase whitespace-nowrap"
              style={{
                color: enPortada ? palette.muted : palette.accent,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
              }}
            >
              {textoCentro}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Lado derecho: icono + nombre + redes */}
        <div className="ml-auto min-w-0 flex items-center gap-3">
          <div className="min-w-0 flex items-center gap-2">
            <GraduationCap
              size={20}
              strokeWidth={1.8}
              className="shrink-0 hidden sm:block"
              style={{ color: palette.accent }}
            />
            <span
              className="font-body font-semibold truncate"
              style={{
                color: palette.text,
                fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
              }}
            >
              {profile.nombre}
            </span>
          </div>

          {(profile.github || profile.correo) && (
            <div
              className="shrink-0 flex items-center pl-2 sm:pl-3"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.12)" }}
            >
              {profile.github && (
                <SocialLink href={profile.github} label="GitHub">
                  <GithubIcon size={20} />
                </SocialLink>
              )}
              {profile.correo && (
                <SocialLink href={`mailto:${profile.correo}`} label="Correo">
                  <Mail size={20} strokeWidth={1.8} />
                </SocialLink>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <div
        className="h-full transition-all duration-150"
        style={{ width: `${progress}%`, backgroundColor: palette.accent }}
      />
    </div>
  );
}

export default Navbar;
