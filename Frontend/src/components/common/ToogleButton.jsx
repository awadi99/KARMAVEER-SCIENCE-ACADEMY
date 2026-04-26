import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ isDark, toggle }) => (
  <button
    onClick={toggle}
    className="relative w-14 h-7 flex items-center bg-slate-200 dark:bg-violet-950/40 rounded-full p-1 transition-colors border border-slate-300 dark:border-violet-500/30"
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      className="w-5 h-5 bg-pink-500 dark:bg-violet-400 rounded-full flex items-center justify-center shadow-lg"
    >
      {isDark ? <Moon size={12} className="text-black" /> : <Sun size={12} className="text-white" />}
    </motion.div>
  </button>
);

export default ThemeToggle;