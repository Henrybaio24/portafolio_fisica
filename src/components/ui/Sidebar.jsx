import { motion } from "framer-motion";
import { House, User, BookOpen, FolderOpen, Circle } from "lucide-react";
import AtomMark from "../Hero/AtomMark";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { navSections } from "../../data/navigation";
import { palette } from "../../data/palette";

// El menú muestra exactamente lo que dice data/navigation.js
export const menuSections = navSections;
const menuIds = menuSections.map((s) => s.id);

// Icono de cada sección (por id). Si agregas una sección nueva, añade su icono aquí.
const icons = {
  portada: House,
  sobre: User,
  silabo: BookOpen,
  trabajos: FolderOpen,
};

/* ---------- Animación: tu AtomMark (ya trae su propia animación) ---------- */
function SidebarAtom() {
  return (
    <div
      className="mb-6 pb-5 flex justify-center"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      aria-hidden="true"
    >
      <div
        className="w-32 h-32"
        style={{
          color: palette.accent,
          filter: `drop-shadow(0 0 12px rgba(${palette.accentRgb},0.35))`,
        }}
      >
        <AtomMark className="w-full h-full" />
      </div>
    </div>
  );
}

/* ------------------ Opción del menú con animación ------------------ */
const accentA = (a) => `rgba(${palette.accentRgb},${a})`;
const T = { duration: 0.2, ease: "easeOut" };

const itemVariants = {
  rest: {
    x: 0,
    color: palette.muted,
    backgroundColor: "rgba(255,255,255,0)",
    borderLeftColor: accentA(0),
    transition: T,
  },
  hover: {
    x: 5,
    color: palette.text,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderLeftColor: accentA(0.55),
    transition: T,
  },
  active: {
    x: 0,
    color: palette.accent,
    backgroundColor: accentA(0.1),
    borderLeftColor: palette.accent,
    transition: T,
  },
  activeHover: {
    x: 5,
    color: palette.accent,
    backgroundColor: accentA(0.17),
    borderLeftColor: palette.accent,
    transition: T,
  },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0, color: palette.muted, transition: T },
  hover: { scale: 1.2, rotate: -8, color: palette.accent, transition: T },
  active: { scale: 1, rotate: 0, color: palette.accent, transition: T },
  activeHover: { scale: 1.2, rotate: -8, color: palette.accent, transition: T },
};

function NavItem({ label, Icon, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      variants={itemVariants}
      initial={false}
      animate={isActive ? "active" : "rest"}
      whileHover={isActive ? "activeHover" : "hover"}
      whileTap={{ scale: 0.97 }}
      className="font-body flex items-center gap-3 text-left rounded-lg px-4 py-3 text-sm font-semibold"
      style={{ borderLeftWidth: 3, borderLeftStyle: "solid" }}
    >
      <motion.span
        variants={iconVariants}
        className="flex items-center justify-center"
      >
        <Icon size={18} strokeWidth={1.8} />
      </motion.span>
      {label}
    </motion.button>
  );
}

/* ------------------------- Sidebar ------------------------- */
function Sidebar({ open, onClose }) {
  const activeId = useScrollSpy(menuIds);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose?.();
  };

  return (
    <>
      {/* Fondo oscuro al abrir el menú en móvil */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-60 py-6 px-3 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "#111115",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <SidebarAtom />

        <nav className="flex flex-col gap-1" aria-label="Menú principal">
          {menuSections.map((s) => (
            <NavItem
              key={s.id}
              label={s.label}
              Icon={icons[s.id] ?? Circle}
              isActive={activeId === s.id}
              onClick={() => scrollTo(s.id)}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
