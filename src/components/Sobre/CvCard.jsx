import ArchivoCard from "../ui/ArchivoCard";

// cv = { archivo: "enlace de Drive o /cv.pdf", vista: "imagen previa (opcional)" }
function CvCard({ cv }) {
  return (
    <ArchivoCard etiqueta="Currículum" titulo="Curriculum Vitae" archivo={cv} />
  );
}

export default CvCard;
