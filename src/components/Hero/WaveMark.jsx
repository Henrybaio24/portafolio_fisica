import { motion } from "framer-motion";

function WaveMark({ className }) {
  return (
    <motion.svg viewBox="0 0 160 160" className={className}>
      <motion.path
        d="M10 80 Q 30 30, 50 80 T 90 80 T 130 80 T 150 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.circle
        cx="80"
        cy="80"
        r="4"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          cx: [50, 130, 50],
        }}
        transition={{
          opacity: { delay: 1.4, duration: 0.3 },
          cx: {
            delay: 1.7,
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </motion.svg>
  );
}

export default WaveMark;
