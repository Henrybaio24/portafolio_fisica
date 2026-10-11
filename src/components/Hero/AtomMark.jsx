// Átomo animado: electrones que recorren exactamente sus órbitas elípticas,
// con estela tipo cometa, núcleo que pulsa y giro lento del conjunto.
// Usa animación nativa de SVG (sin dependencias). Hereda el color con currentColor.

const C = 100; // centro del viewBox 200x200
const RX = 85;
const RY = 32;

const ORBIT_FWD = `M ${C + RX} ${C} A ${RX} ${RY} 0 1 1 ${C - RX} ${C} A ${RX} ${RY} 0 1 1 ${C + RX} ${C}`;
const ORBIT_REV = `M ${C + RX} ${C} A ${RX} ${RY} 0 1 0 ${C - RX} ${C} A ${RX} ${RY} 0 1 0 ${C + RX} ${C}`;

// Cada electrón: ángulo de su órbita, duración de una vuelta y sentido
const ORBITS = [
  { angle: 0, dur: 5, reverse: false },
  { angle: 60, dur: 7, reverse: true },
  { angle: -60, dur: 9, reverse: false },
];

// Estela: [radio, opacidad, retraso en segundos]
const TRAIL = [
  [3.4, 0.5, 0.14],
  [2.6, 0.32, 0.28],
  [1.8, 0.18, 0.42],
];

function Electron({ dur, path, reduce }) {
  const motion = (lag) =>
    !reduce && (
      <animateMotion
        dur={`${dur}s`}
        repeatCount="indefinite"
        path={path}
        // un valor negativo adelanta la animación; así la copia queda "detrás" del electrón
        begin={lag ? `-${(dur - lag).toFixed(3)}s` : "0s"}
      />
    );

  return (
    <g>
      {TRAIL.map(([r, o, lag]) => (
        <circle key={lag} r={r} fill="currentColor" opacity={o}>
          {motion(lag)}
        </circle>
      ))}
      <circle r="8" fill="currentColor" opacity="0.18">
        {motion(0)}
      </circle>
      <circle r="4.2" fill="currentColor">
        {motion(0)}
      </circle>
    </g>
  );
}

function AtomMark({ className }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="atom-nucleus">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Conjunto con aparición suave y giro lento */}
      <g>
        {!reduce && (
          <>
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="1.2s"
              fill="freeze"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${C} ${C}`}
              to={`360 ${C} ${C}`}
              dur="60s"
              repeatCount="indefinite"
            />
          </>
        )}

        {/* Órbitas */}
        {ORBITS.map(({ angle }) => (
          <ellipse
            key={angle}
            cx={C}
            cy={C}
            rx={RX}
            ry={RY}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.5"
            transform={`rotate(${angle} ${C} ${C})`}
          />
        ))}

        {/* Electrones sobre su órbita */}
        {ORBITS.map(({ angle, dur, reverse }) => (
          <g key={angle} transform={`rotate(${angle} ${C} ${C})`}>
            <Electron
              dur={dur}
              path={reverse ? ORBIT_REV : ORBIT_FWD}
              reduce={reduce}
            />
          </g>
        ))}

        {/* Núcleo: halo que pulsa + centro brillante */}
        <circle cx={C} cy={C} r="16" fill="url(#atom-nucleus)" opacity="0.55">
          {!reduce && (
            <>
              <animate
                attributeName="r"
                values="14;20;14"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0.75;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle cx={C} cy={C} r="6.5" fill="currentColor">
          {!reduce && (
            <animate
              attributeName="r"
              values="6;7.5;6"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
    </svg>
  );
}

export default AtomMark;
