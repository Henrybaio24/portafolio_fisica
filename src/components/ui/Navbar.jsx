import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Mail } from "lucide-react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { navSections } from "../../data/navigation";
import GithubIcon from "./GithubIcon";
import { palette } from "../../data/palette";
import { profile } from "../../data/profile";

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
