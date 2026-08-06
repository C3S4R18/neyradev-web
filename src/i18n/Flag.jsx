// Banderas en SVG en lugar de emoji.
//
// Unicode solo tiene banderas de país (y tres subdivisiones: Inglaterra,
// Escocia y Gales). Para euskera, catalán y gallego no existe emoji, así que
// mezclarlos dejaría tres huecos. Dibujadas aquí salen todas del mismo tamaño,
// se ven igual en cualquier sistema y no dependen de la fuente de emoji.
//
// Ojo: una bandera representa un territorio, no un idioma. Aquí acompañan al
// nombre nativo, que es lo que de verdad identifica la opción.

const VIEW = "0 0 24 16";

const SHAPES = {
  // Castellano: rojigualda.
  es: (
    <>
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </>
  ),
  // Euskara: ikurriña. Aspa verde y cruz blanca sobre fondo rojo.
  // Grosores medidos sobre el render: dan 49% rojo / 24% verde / 20% blanco.
  // Con trazos más gruesos el aspa se comía el campo rojo.
  eu: (
    <>
      <rect width="24" height="16" fill="#D52B1E" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#009B48" strokeWidth="2.2" />
      <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="2.2" />
    </>
  ),
  // Català: senyera, cuatro palos rojos sobre oro.
  ca: (
    <>
      <rect width="24" height="16" fill="#FCDD09" />
      <g fill="#DA121A">
        <rect y="1.78" width="24" height="1.78" />
        <rect y="5.33" width="24" height="1.78" />
        <rect y="8.89" width="24" height="1.78" />
        <rect y="12.44" width="24" height="1.78" />
      </g>
    </>
  ),
  // Galego: banda azul en diagonal sobre blanco.
  gl: (
    <>
      <rect width="24" height="16" fill="#FFFFFF" />
      <path d="M0 0 L24 16" stroke="#0079C0" strokeWidth="3.2" />
    </>
  ),
  // English: Union Jack simplificada. Proporciones ajustadas hasta dejar el
  // azul dominante (42% azul / 28% rojo / 22% blanco); con los trazos anchos
  // las diagonales rojas tapaban las esquinas.
  en: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="0.9" />
      <path d="M12 0 V16 M0 8 H24" stroke="#FFFFFF" strokeWidth="3.6" />
      <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2" />
    </>
  ),
  // Français: tricolor vertical.
  fr: (
    <>
      <rect width="8" height="16" fill="#002395" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </>
  ),
  // Português: verde y rojo con la esfera armilar simplificada.
  pt: (
    <>
      <rect width="24" height="16" fill="#DA291C" />
      <rect width="9.6" height="16" fill="#046A38" />
      <circle cx="9.6" cy="8" r="3.4" fill="#FFE900" stroke="#046A38" strokeWidth="0.8" />
      <circle cx="9.6" cy="8" r="1.5" fill="#DA291C" />
    </>
  ),
  // Deutsch: negro, rojo y oro.
  de: (
    <>
      <rect width="24" height="16" fill="#000000" />
      <rect y="5.33" width="24" height="5.33" fill="#DD0000" />
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
    </>
  ),
  // Italiano: tricolor vertical.
  it: (
    <>
      <rect width="8" height="16" fill="#008C45" />
      <rect x="8" width="8" height="16" fill="#F4F5F0" />
      <rect x="16" width="8" height="16" fill="#CD212A" />
    </>
  ),
};

/**
 * Bandera del idioma. Decorativa: el nombre nativo va siempre al lado, así que
 * se oculta a los lectores de pantalla.
 */
export default function Flag({ code, className = "w-6 h-4" }) {
  const shape = SHAPES[code];
  if (!shape) return null;

  return (
    <svg
      viewBox={VIEW}
      className={`${className} rounded-[2px] shrink-0 ring-1 ring-veil/20 overflow-hidden`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {shape}
    </svg>
  );
}
