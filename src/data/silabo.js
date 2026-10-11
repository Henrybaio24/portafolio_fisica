// DATOS DE PRUEBA: reemplaza los textos por los de tu sílabo.
export const silabo = {
    asignatura: "Física Aplicada",

    // PDF del sílabo completo (enlace de Drive o ruta como "/silabo.pdf").
    // Déjalo en null mientras no lo tengas.
    archivo: null,
    vista: null, // imagen previa (opcional; si es de Drive se genera sola)

    // Unidades. "archivo" (PDF de la unidad) es opcional.
    unidades: [
        {
            numero: 1,
            titulo: "Mecánica",
            descripcion:
                "Estudio del movimiento de la partícula en una y dos dimensiones y aplicación de las leyes de Newton a situaciones reales.",
            archivo: null,
        },
        {
            numero: 2,
            titulo: "Termodinámica",
            descripcion:
                "Conceptos de temperatura, calor y energía interna, y las leyes que gobiernan los procesos térmicos.",
            archivo: null,
        },
        {
            numero: 3,
            titulo: "Ondas y óptica",
            descripcion:
                "Movimiento ondulatorio, sonido y comportamiento de la luz: reflexión, refracción e instrumentos ópticos.",
            archivo: null,
        },
        {
            numero: 4,
            titulo: "Electromagnetismo",
            descripcion:
                "Campos eléctricos y magnéticos, circuitos de corriente continua y fenómenos de inducción electromagnética.",
            archivo: null,
        },
    ],
};