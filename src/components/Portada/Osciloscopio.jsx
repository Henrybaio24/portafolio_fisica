import Lissajous from "../ui/Lissajous";
import { palette } from "../../data/palette";

/* Pantalla de osciloscopio con retícula y lecturas */
function Osciloscopio({ className = "" }) {
  const read = {
    color: palette.muted,
    fontSize: "0.65rem",
    letterSpacing: "0.08em",
    opacity: 0.85,
  };

  return (
    <div
      className={`relative aspect-square w-full rounded-2xl overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0.25))",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: `0 0 70px rgba(${palette.accentRgb},0.08), inset 0 0 50px rgba(0,0,0,0.45)`,
      }}
      aria-hidden="true"
    >
      {/* Retícula */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "12.5% 12.5%",
        }}
      />
      {/* Ejes centrales */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px"
        style={{ background: "rgba(255,255,255,0.16)" }}
      />
      <div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.16)" }}
      />

      {/* Señal */}
      <div className="absolute inset-[8%]">
        <Lissajous opacity={0.9} lineWidth={1.8} glow={16} />
      </div>

      {/* Lecturas */}
      <span className="font-mono-formula absolute top-3 left-4" style={read}>
        CH1 · 3 : 2
      </span>
      <span className="font-mono-formula absolute bottom-3 left-4" style={read}>
        x = sen(3t + δ)
      </span>
      <span
        className="font-mono-formula absolute bottom-3 right-4"
        style={read}
      >
        y = sen(2t)
      </span>
    </div>
  );
}

export default Osciloscopio;
