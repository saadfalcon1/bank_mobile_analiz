import { motion } from "framer-motion";

interface ScoreBarProps {
  score: number;
  max?: number;
  delay?: number;
}

export const ScoreBar = ({ score, max = 100, delay = 0 }: ScoreBarProps) => {
  const percent = Math.min((score / max) * 100, 100);
  const colorClass = score >= 80 ? "score-bar-high" : score >= 60 ? "score-bar-mid" : "score-bar-low";

  return (
    <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
};
