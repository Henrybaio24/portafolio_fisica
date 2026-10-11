import { useEffect, useRef } from "react";
import { palette } from "../../data/palette";

/**
 * Figura de Lissajous animada en canvas (efecto osciloscopio).
 * Ocupa el 100% de su contenedor (que debe ser cuadrado).
 * Props: opacity, lineWidth y glow controlan la intensidad de la curva principal.
 */
function Lissajous({
  opacity = 0.5,
  lineWidth = 1.6,
  glow = 14,
  className = "w-full h-full",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf;
    let size = 0;

    const trazar = (a, b, delta, amp, color, width, blur) => {
      const c = size / 2;
      ctx.beginPath();
      for (let i = 0; i <= 1000; i++) {
        const t = (i / 1000) * Math.PI * 2;
        const x = c + Math.sin(a * t + delta) * amp;
        const y = c + Math.sin(b * t) * amp;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
      ctx.stroke();
    };

    const pintar = (ms) => {
      const t = ms / 1000;
      const amp = size * 0.46;
      ctx.clearRect(0, 0, size, size);
      // curva secundaria, tenue
      trazar(5, 4, -t * 0.2, amp * 0.8, "rgba(255,255,255,0.13)", 1, 0);
      // curva principal
      trazar(
        3,
        2,
        t * 0.35,
        amp,
        `rgba(${palette.accentRgb},${opacity})`,
        lineWidth,
        glow,
      );
    };

    const bucle = (ms) => {
      pintar(ms);
      raf = requestAnimationFrame(bucle);
    };

    const ajustarTamano = () => {
      const dpr = window.devicePixelRatio || 1;
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) pintar(0);
    };

    ajustarTamano();
    if (!reduce) raf = requestAnimationFrame(bucle);

    const observer = new ResizeObserver(ajustarTamano);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [opacity, lineWidth, glow]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

export default Lissajous;
