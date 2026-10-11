import { motion } from "framer-motion";

function FormulaMark({ className, delay = 0 }) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <motion.p
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ delay, duration: 1.2, ease: "easeInOut" }}
        style={{ margin: 0, whiteSpace: "nowrap" }}
        className="text-current font-mono-formula text-4xl"
      >
        E = mc²
      </motion.p>
    </div>
  );
}

export default FormulaMark;
