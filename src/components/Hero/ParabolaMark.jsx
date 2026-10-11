import { motion } from "framer-motion";

function ParabolaMark({ className }) {
  return (
    <motion.svg viewBox="0 0 160 160" className={className}>
      <motion.path
        d="M15 130 Q 80 10, 145 130"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 10"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.circle
        r="5"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          offsetDistance: ["0%", "100%"],
        }}
        style={{
          offsetPath: "path('M15 130 Q 80 10, 145 130')",
        }}
        transition={{
          opacity: { delay: 1.4, duration: 0.3 },
          offsetDistance: {
            delay: 1.7,
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </motion.svg>
  );
}

export default ParabolaMark;
