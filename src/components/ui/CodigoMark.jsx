const LINEAS = [
  { x: 11, y: 22, ancho: 20, opacidad: 1, tramo: [0, 0.12] },
  { x: 17, y: 29, ancho: 26, opacidad: 0.55, tramo: [0.14, 0.3] },
  { x: 11, y: 36, ancho: 14, opacidad: 0.8, tramo: [0.32, 0.45] },
];
const CICLO = "6s";

function CodigoMark({ className }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="6"
        width="50"
        height="44"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <line
        x1="3"
        y1="16"
        x2="53"
        y2="16"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      {[11, 17, 23].map((cx, i) => (
        <circle
          key={cx}
          cx={cx}
          cy="11"
          r="1.6"
          fill="currentColor"
          opacity={0.9 - i * 0.25}
        />
      ))}

      {LINEAS.map(({ x, y, ancho, opacidad, tramo: [ini, fin] }, i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={reduce ? ancho : 0}
          height="3"
          rx="1.5"
          fill="currentColor"
          opacity={opacidad}
        >
          {!reduce && (
            <animate
              attributeName="width"
              dur={CICLO}
              repeatCount="indefinite"
              values={
                ini === 0 ? `0;${ancho};${ancho};0` : `0;0;${ancho};${ancho};0`
              }
              keyTimes={
                ini === 0 ? `0;${fin};0.92;1` : `0;${ini};${fin};0.92;1`
              }
            />
          )}
        </rect>
      ))}

      <rect x="29" y="34" width="2" height="7" rx="1" fill="currentColor">
        {!reduce && (
          <animate
            attributeName="opacity"
            values="1;1;0;0;1"
            keyTimes="0;0.5;0.5;1;1"
            dur="1s"
            repeatCount="indefinite"
            calcMode="discrete"
          />
        )}
      </rect>
    </svg>
  );
}

export default CodigoMark;
